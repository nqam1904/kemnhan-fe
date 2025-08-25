import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-activity';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import ItemProduct from './item-product';
import './product.css';

const ProductsComponents: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [displayPrice, setDisplayPrice] = useState<number>(0);
    const [sellPrice, setSellPrice] = useState<number | string>(0);
    const [soldQuantity, setSoldQuantity] = useState<number>(0);
    const [stockQuantity, setStockQuantity] = useState<number | string>(0);
    const [isFeature, setIsFeature] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [selectCategory, setSelectCategory] = useState<string>('');
    const [category, setCategory] = useState<any[] | null>(null);
    const [shopeeUrl, setShopeeUrl] = useState<string>('');
    const [imagesId, setImagesId] = useState<any[]>([]);
    const [media, setMedia] = useState<FileList | File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getDataCategory = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/categories`)
            .then((res) => {
                setCategory(res.data || []);
            })
            .catch((_err) => {});
    }, []);

    const getDateProduct = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/products`)
            .then((res) => {
                setProducts(res.data || []);
            })
            .catch((_err) => {});
    }, []);

    useEffect(() => {
        getDateProduct();
        getDataCategory();
    }, [getDataCategory, getDateProduct]);

    const uploadMultipleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const previews = Array.from(e.target.files).map((file: any) =>
                URL.createObjectURL(file)
            );
            setFilePreviews(previews);
            setMedia(e.target.files);
        }
    }, []);

    const onEdit = useCallback((productId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/products/${productId}`)
            .then((res) => {
                setId(productId);
                setShowModal(true);
                setTitleModal('Cập nhật sản phẩm');
                setName(res.data.name || '');
                setUnit(res.data.unit || '');
                setDescription(res.data.description || '');
                setDisplayPrice(parseInt(res.data.displayPrice, 10) || 0);
                setSellPrice(parseInt(res.data.sellPrice, 10) || 0);
                setSoldQuantity(parseInt(res.data.soldQuantity, 10) || 0);
                setStockQuantity(parseInt(res.data.stockQuantity, 10) || 0);
                setIsFeature(Boolean(res.data.isFeature));
                setIsActive(Boolean(res.data.isActive));
                setShopeeUrl(res.data.shopeeUrl || '');
                setSelectCategory(res.data.categories || '');
                setImagesId(res.data.images?.[0]?.key ? [res.data.images[0].key] : []);
            })
            .catch((_error) => {});
    }, []);

    const onDelete = useCallback(
        (productId: any) => {
            axios
                .delete(`${CONFIG.serverUrl}/products/${productId}`)
                .then((_) => {
                    toast.success('Xóa thành công');
                    getDateProduct();
                })
                .catch((error) => {
                    toast.error(`${error}`);
                });
        },
        [getDateProduct]
    );

    const onFeature = useCallback(
        (productId: any, feature: any) => {
            axios
                .put(`${CONFIG.serverUrl}/products/${productId}`, {
                    isFeature: !feature,
                })
                .then((_) => {
                    toast.success('Cập nhật thành công');
                    getDateProduct();
                })
                .catch((_error) => {});
        },
        [getDateProduct]
    );

    const onActive = useCallback(
        (productId: any, active: any) => {
            axios
                .put(`${CONFIG.serverUrl}/products/${productId}`, {
                    isActive: !active,
                })
                .then((_) => {
                    toast.success('Cập nhật thành công');
                    getDateProduct();
                })
                .catch((_error) => {});
        },
        [getDateProduct]
    );

    const onSaveImg = useCallback(() => {
        const bodyFormData = new FormData();
        // Append all selected files
        if (media && (media as FileList).length !== undefined) {
            Array.from(media as FileList).forEach((file) => bodyFormData.append('medias', file));
        }
        axios
            .post(`${CONFIG.serverUrl}/media`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                axios
                    .post(`${CONFIG.serverUrl}/products`, {
                        name,
                        unit,
                        description,
                        displayPrice: parseInt(String(displayPrice), 10),
                        sellPrice: parseInt(String(sellPrice), 10),
                        soldQuantity: parseInt(String(soldQuantity), 10),
                        stockQuantity: parseInt(String(stockQuantity), 10),
                        isFeature,
                        isActive,
                        shopeeUrl,
                        categoriesId: [parseInt(String(selectCategory), 10)],
                        imagesId: res.data.mediasId,
                    })
                    .then((_) => {
                        setShowModal(false);
                        setId('');
                        setName('');
                        setUnit('');
                        setDescription('');
                        setDisplayPrice(0);
                        setSellPrice(0);
                        setStockQuantity(0);
                        setImagesId([]);
                        setFilePreviews([]);
                        toast.success('Thêm sản phẩm thành công!');
                        getDateProduct();
                    })
                    .catch((_error) => {});
            })
            .catch((_) => {});
    }, [
        description,
        displayPrice,
        getDateProduct,
        isActive,
        isFeature,
        media,
        name,
        selectCategory,
        sellPrice,
        shopeeUrl,
        soldQuantity,
        stockQuantity,
        unit,
    ]);

    const onPutImg = useCallback(
        (productId: any) => {
            axios
                .put(`${CONFIG.serverUrl}/products/${productId}`, {
                    name,
                    unit,
                    description,
                    displayPrice: parseInt(String(displayPrice), 10),
                    sellPrice: parseInt(String(sellPrice), 10),
                    stockQuantity: parseInt(String(stockQuantity), 10),
                    isFeature,
                    isActive,
                    shopeeUrl,
                    categoriesId: [parseInt(String(selectCategory), 10)],
                })
                .then((_) => {
                    setShowModal(false);
                    setId('');
                    setName('');
                    setUnit('');
                    setDescription('');
                    setDisplayPrice(0);
                    setSellPrice(0);
                    setStockQuantity(0);
                    setImagesId([]);
                    getDateProduct();
                })
                .catch((_error) => {});
        },
        [
            description,
            displayPrice,
            getDateProduct,
            isActive,
            isFeature,
            name,
            selectCategory,
            sellPrice,
            shopeeUrl,
            stockQuantity,
            unit,
        ]
    );

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (id) {
                onPutImg(id);
                toast.success('Cập nhật sản phẩm thành công!');
            } else {
                if (
                    name === '' ||
                    unit === '' ||
                    selectCategory === '' ||
                    String(sellPrice) === '' ||
                    String(stockQuantity) === ''
                ) {
                    toast.warn('Vui lòng nhập những thông tin bắt buộc!');
                    return;
                }
                setLoading(true);
                onSaveImg();
                setLoading(false);
            }
        },
        [id, name, onPutImg, onSaveImg, selectCategory, sellPrice, stockQuantity, unit]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            switch (name) {
                case 'name':
                    setName(value);
                    break;
                case 'unit':
                    setUnit(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'sellPrice':
                    setSellPrice(value);
                    break;
                case 'displayPrice':
                    setDisplayPrice(parseInt(value, 10) || 0);
                    break;
                case 'stockQuantity':
                    setStockQuantity(value);
                    break;
                case 'shopeeUrl':
                    setShopeeUrl(value);
                    break;
                case 'selectCategory':
                    setSelectCategory(value);
                    break;
                default:
                    break;
            }
        },
        []
    );

    const renderedProducts = useMemo(() => {
        if (!products || products.length === 0) return null;
        return products.map((item: any, index: any) => (
            <ItemProduct
                key={index}
                index={index}
                id={item.id}
                name={item.name}
                slug={item.slug}
                unit={item.unit}
                description={item.description}
                displayPrice={item.displayPrice}
                soldQuantity={item.soldQuantity}
                sellPrice={item.sellPrice}
                stockQuantity={item.stockQuantity}
                categoriesId={item.categoriesId}
                isFeature={item.isFeature}
                isActive={item.isActive}
                images={item.images?.[0]?.key}
                onEdit={onEdit}
                onDelete={onDelete}
                onUpdateStatus={(idProp: any, status: any) =>
                    console.log('Update status', idProp, status)
                }
                onFeature={() => onFeature(item.id, item.isFeature)}
                onActive={() => onActive(item.id, item.isActive)}
            />
        ));
    }, [onActive, onDelete, onEdit, onFeature, products]);

    const result = loading ? <Spinner size={32} speed={1} animating={true} /> : renderedProducts;

    return (
        <>
            <h1 className="mt-10">Danh sách sản phẩm</h1>
            <ToastContainer autoClose={3000} />
            <div className="text-right">
                <Button
                    type="button"
                    className="btn btn-primary mbt-10"
                    onClick={() => {
                        setShowModal(true);
                        setTitleModal('Thêm sản phẩm');
                        setId('');
                        setName('');
                        setUnit('');
                        setDescription('');
                        setDisplayPrice(0);
                        setSellPrice(0);
                        setStockQuantity(0);
                        setImagesId([]);
                        setShopeeUrl('');
                        setSelectCategory('');
                        setFilePreviews([]);
                    }}
                >
                    Thêm sản phẩm
                </Button>
                <Button
                    variant="success"
                    className="mbt-10 ml-10"
                    type="button"
                    onClick={() => {
                        window.open('https://kemnhanonline.vn/api/products/export', '_blank');
                    }}
                >
                    Xuất Excel
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th> # </th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Giá tiền</th>
                        <th>Đã bán được</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Mô tả</th>
                        <th>Nổi bật</th>
                        <th>Hiển thị</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>{result}</tbody>
            </Table>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <Form onSubmit={onSave}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}>{titleModal.toString()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Danh Mục <sup className="sub_text">*</sup>
                                </label>
                                <select
                                    className="form-control"
                                    size={1 as any}
                                    onChange={handleChange}
                                    value={selectCategory}
                                    name="selectCategory"
                                >
                                    <option>---Thêm danh mục---</option>
                                    {category &&
                                        category.map((item: any, index: any) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Tên sản phẩm <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    placeholder="Nhập tên sản phẩm"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <label>Hình ảnh</label>
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Hình ảnh đầu tiên sẽ là hình mặc định"
                            lang="en"
                            custom
                            multiple
                            type="file"
                            onChange={uploadMultipleFiles}
                        />
                        <div className="mbt-10 show_image">
                            <div className="container testimonial-group">
                                <div className="row text-center">
                                    <div className="col-xs-4">
                                        {(filePreviews || []).map((url: any) => (
                                            <img src={url} width="100" height="auto" alt={name} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Tiền <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="sellPrice"
                                    placeholder="Nhập giá tiền sản phẩm"
                                    value={sellPrice}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label>
                                    Đơn vị <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    name="unit"
                                    placeholder="Ví du: Hộp, Cái,..."
                                    value={unit}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Số lượng <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="stockQuantity"
                                    placeholder="Nhập số lượng sản phẩm"
                                    value={stockQuantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className=" form-group col-6">
                                <label> Link Shoppe (Nếu có)</label>
                                <input
                                    className="form-control"
                                    name="shopeeUrl"
                                    placeholder="Nhập link shoppee nếu có"
                                    value={shopeeUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label> Mô tả </label>
                        <textarea
                            className="form-control"
                            placeholder="Nhập mô tả sản phẩm"
                            name="description"
                            value={description}
                            onChange={handleChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Đóng
                        </Button>
                        <Button type="submit">Lưu</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ProductsComponents;
