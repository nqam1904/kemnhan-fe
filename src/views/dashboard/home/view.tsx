import './dashboard-home.css';

import type { Order, OrderLine } from '@/store/types/order';
import type { ApexOptions } from 'apexcharts';

import { useGetOrdersQuery } from '@/store/apis/orders';
import { useGetProductsQuery } from '@/store/apis/products';
import { fNumber } from '@/utils/format-number';
import { fDateTime } from '@/utils/format-time';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const HomeView = () => {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Fetch data
    const { data: products = [], isLoading: productsLoading } = useGetProductsQuery();
    const { data: orders = [], isLoading: ordersLoading } = useGetOrdersQuery();

    // Statistics calculations
    const stats = useMemo(() => {
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const completedOrders = orders.filter((order: Order) => order.status === 3).length;
        const totalRevenue = orders
            .filter((order: Order) => order.status === 3)
            .reduce((sum: number, order: Order) => sum + order.amountTotal, 0);

        return {
            totalProducts,
            totalOrders,
            completedOrders,
            totalRevenue,
            pendingOrders: orders.filter((order: Order) => order.status === 1).length,
            shippingOrders: orders.filter((order: Order) => order.status === 2).length,
            rejectedOrders: orders.filter((order: Order) => order.status === 4).length,
        };
    }, [products, orders]);

    // Inventory chart data
    const inventoryChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: products.slice(0, 10).map((product: any) => product.name || 'N/A'),
            labels: {
                style: {
                    fontSize: '12px',
                },
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: 'Số lượng tồn kho',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter(val: number) {
                    return `${val} sản phẩm`;
                },
            },
        },
        colors: ['#008FFB'],
    };

    const inventoryChartSeries = [
        {
            name: 'Tồn kho',
            data: products.slice(0, 10).map((product: any) => product.quantity || 0),
        },
    ];

    // Revenue chart data (calculated from completed orders)
    const revenueData = useMemo(() => {
        const completedOrders = orders.filter((order: Order) => order.status === 3);
        const monthlyRevenue: { [key: string]: number } = {};

        completedOrders.forEach((order: Order) => {
            const month = new Date(order.createDate).toISOString().slice(0, 7); // YYYY-MM
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.amountTotal;
        });

        const sortedMonths = Object.keys(monthlyRevenue).sort();
        const last6Months = sortedMonths.slice(-6);

        return {
            categories: last6Months.map(month => `${month}-01T00:00:00.000Z`),
            data: last6Months.map(month => monthlyRevenue[month] || 0),
        };
    }, [orders]);

    const revenueChartOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: revenueData.categories,
        },
        tooltip: {
            x: {
                format: 'MM/yyyy',
            },
            y: {
                formatter(val: number) {
                    return `${fNumber(val)}đ`;
                },
            },
        },
        colors: ['#00E396'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
    };

    const revenueChartSeries = [
        {
            name: 'Doanh thu',
            data: revenueData.data,
        },
    ];

    // Order status mapping
    const getOrderStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return <Badge bg="warning">Chờ duyệt</Badge>;
            case 2:
                return <Badge bg="info">Đang giao</Badge>;
            case 3:
                return <Badge bg="success">Hoàn thành</Badge>;
            case 4:
                return <Badge bg="danger">Từ chối</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    // DataTable columns
    const orderColumns = [
        {
            name: 'Mã đơn hàng',
            selector: (row: Order) => row.id,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Khách hàng',
            selector: (row: Order) => `${row.customer.firstName} ${row.customer.lastName}`,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: (row: Order) => row.customer.phone,
            sortable: true,
        },
        {
            name: 'Tổng tiền',
            selector: (row: Order) => row.amountTotal,
            sortable: true,
            format: (row: Order) => `${fNumber(row.amountTotal)}đ`,
        },
        {
            name: 'Trạng thái',
            selector: (row: Order) => row.status,
            sortable: true,
            cell: (row: Order) => getOrderStatusBadge(row.status),
        },
        {
            name: 'Ngày tạo',
            selector: (row: Order) => row.createDate,
            sortable: true,
            format: (row: Order) => fDateTime(row.createDate, 'DD/MM/YYYY HH:mm'),
        },
    ];

    const handleRowClick = (row: Order) => {
        setSelectedOrder(row);
        setShowOrderModal(true);
    };

    const handleCloseModal = () => {
        setShowOrderModal(false);
        setSelectedOrder(null);
    };

    if (productsLoading || ordersLoading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid dashboard-modern">
            <h2 className="page-title">Tổng quan</h2>

            {/* Statistics Cards (Metric style) */}
            <Row className="mb-5 dashboard-stats-row">
                <Col md={3}>
                    <Card className="metric-card">
                        <Card.Body>
                            <div className="metric-head">
                                <div className="metric-title">Sản phẩm</div>
                                <div className="metric-icon metric-icon-purple">👤</div>
                            </div>
                            <div className="metric-value">{fNumber(stats.totalProducts)}</div>
                            <div className="metric-trend">
                                <span className="trend-up">▲ 0%</span>
                                <span className="metric-trend-text">So với tháng trước</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="metric-card">
                        <Card.Body>
                            <div className="metric-head">
                                <div className="metric-title">Đơn hàng</div>
                                <div className="metric-icon metric-icon-purple">🛒</div>
                            </div>
                            <div className="metric-value">{fNumber(stats.totalOrders)}</div>
                            <div className="metric-trend">
                                <span className="trend-down">▼ 0%</span>
                                <span className="metric-trend-text">So với tháng trước</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="metric-card">
                        <Card.Body>
                            <div className="metric-head">
                                <div className="metric-title">Doanh thu</div>
                                <div className="metric-icon metric-icon-purple">💲</div>
                            </div>
                            <div className="metric-value">{fNumber(stats.totalRevenue)}đ</div>
                            <div className="metric-trend">
                                <span className="trend-down">▼ 0%</span>
                                <span className="metric-trend-text">So với tháng trước</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="metric-card">
                        <Card.Body>
                            <div className="metric-head">
                                <div className="metric-title">Tỉ lệ hoàn thành</div>
                                <div className="metric-icon metric-icon-purple">📈</div>
                            </div>
                            <div className="metric-value">
                                {stats.totalOrders ? `+ ${((stats.completedOrders / stats.totalOrders) * 100).toFixed(2)}%` : '+ 0%'}
                            </div>
                            <div className="metric-trend">
                                <span className="trend-up">▲ 0%</span>
                                <span className="metric-trend-text">So với tháng trước</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Order Status Summary */}
            <Row className="mb-5 dashboard-stats-row">
                <Col md={3}>
                    <Card className="dashboard-stats-card text-center">
                        <Card.Body>
                            <h6 className="card-title">Chờ duyệt</h6>
                            <h4>{stats.pendingOrders}</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="dashboard-stats-card text-center">
                        <Card.Body>
                            <h6 className="card-title">Đang giao</h6>
                            <h4>{stats.shippingOrders}</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="dashboard-stats-card text-center">
                        <Card.Body>
                            <h6 className="card-title">Hoàn thành</h6>
                            <h4>{stats.completedOrders}</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="dashboard-stats-card text-center">
                        <Card.Body>
                            <h6 className="card-title">Từ chối</h6>
                            <h4>{stats.rejectedOrders}</h4>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row className="mb-5 dashboard-charts-row">
                <Col md={8}>
                    <Card className="dashboard-chart-card">
                        <Card.Header>
                            <h5>Doanh thu theo tháng</h5>
                        </Card.Header>
                        <Card.Body>
                            <Chart
                                options={revenueChartOptions}
                                series={revenueChartSeries}
                                type="area"
                                height={360}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <div className="d-flex flex-column gap-4">
                        <Card className="dashboard-chart-card">
                            <Card.Header>
                                <h5>Trạng thái đơn hàng</h5>
                            </Card.Header>
                            <Card.Body>
                                <Chart
                                    options={{
                                        chart: { type: 'donut', height: 280 },
                                        labels: ['Chờ duyệt', 'Đang giao', 'Hoàn thành', 'Từ chối'],
                                        colors: ['#FFC107', '#17A2B8', '#28A745', '#DC3545'],
                                        legend: { position: 'bottom' },
                                        plotOptions: { pie: { donut: { size: '70%' } } },
                                        dataLabels: {
                                            enabled: true,
                                            formatter(val: number) { return `${val.toFixed(1)}%`; },
                                        },
                                    }}
                                    series={[stats.pendingOrders, stats.shippingOrders, stats.completedOrders, stats.rejectedOrders]}
                                    type="donut"
                                    height={280}
                                />
                            </Card.Body>
                        </Card>
                        <Card className="dashboard-chart-card">
                            <Card.Header>
                                <h5>Tồn kho (Top 10)</h5>
                            </Card.Header>
                            <Card.Body>
                                <Chart
                                    options={inventoryChartOptions}
                                    series={inventoryChartSeries}
                                    type="bar"
                                    height={280}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

            {/* Orders Table */}
            <Row className="mb-5">
                <Col>
                    <Card className="dashboard-table-card">
                        <Card.Header>
                            <h5>Đơn hàng gần đây</h5>
                        </Card.Header>
                        <Card.Body>
                            <DataTable
                                columns={orderColumns}
                                data={orders}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 30]}
                                highlightOnHover
                                pointerOnHover
                                onRowClicked={handleRowClick}
                                noDataComponent="Không có dữ liệu"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Order Detail Modal */}
            <Modal show={showOrderModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng #{selectedOrder?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <Row className="order-info-row mb-3">
                                <Col md={6}>
                                    <h6>Thông tin khách hàng:</h6>
                                    <p>
                                        <strong>Họ tên:</strong> {selectedOrder.customer.firstName}{' '}
                                        {selectedOrder.customer.lastName}
                                    </p>
                                    <p>
                                        <strong>Số điện thoại:</strong> {selectedOrder.customer.phone}
                                    </p>
                                    {selectedOrder.customer.email && (
                                        <p>
                                            <strong>Email:</strong> {selectedOrder.customer.email}
                                        </p>
                                    )}
                                    {selectedOrder.customer.address && (
                                        <p>
                                            <strong>Địa chỉ:</strong> {selectedOrder.customer.address}
                                        </p>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <h6>Thông tin đơn hàng:</h6>
                                    <p>
                                        <strong>Trạng thái:</strong> {getOrderStatusBadge(selectedOrder.status)}
                                    </p>
                                    <p>
                                        <strong>Ngày tạo:</strong>{' '}
                                        {fDateTime(selectedOrder.createDate, 'DD/MM/YYYY HH:mm')}
                                    </p>
                                    <p>
                                        <strong>Tổng tiền:</strong> {fNumber(selectedOrder.amountTotal)}đ
                                    </p>
                                    {selectedOrder.note && (
                                        <p>
                                            <strong>Ghi chú:</strong> {selectedOrder.note}
                                        </p>
                                    )}
                                </Col>
                            </Row>

                            {selectedOrder.lines && selectedOrder.lines.length > 0 && (
                                <div className="order-details-section">
                                    <h6>Chi tiết sản phẩm:</h6>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Đơn giá</th>
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.lines.map((line: OrderLine) => (
                                                    <tr key={line.id}>
                                                        <td>{line.name}</td>
                                                        <td>{line.quantity}</td>
                                                        <td>{fNumber(line.unitPrice)}đ</td>
                                                        <td>{fNumber(line.subtotal)}đ</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomeView;