const API_URL = 'https://kemnhanonline.vn/api';

const userData = {
  firstName: "",
  lastName: "",
  isActive: null,
  phone: "",
  email: "",
  role: "",
  id: "",
  accessToken: "",
}
const API_NEWS = [
  {
    id: 1,
    name: 'THỨ 3 ƯU ĐÃI THẢ GA',
    description: `THỨ 3 ƯU ĐÃI THẢ GA
  Kemnhanonline KHAO BẠN 1 LY KEM DỪA PHIÊN BẢN ĐẶC BIỆT !!!
  Tương truyền ai thấy bài viết này, vừa @Tag vừa Share về tường mình thì không sớm hay muộn bạn cũng sẽ được khao ăn kem thỏa thích.
  Cơ mà nếu chưa thấy ai ngỏ lời thì thứ 3 tuần này vẫn cứ ghé kemnhanonline để bọn mình khao bạn 1 ly kem dừa phiên bản đặc biệt ngập tràn topping siêu ngon nhé !!!
  (*) Ưu đãi áp dụng khi MUA 1 scoop kem vị bất kì kèm topping, TẶNG NGAY 1 ly kem dừa Coconut Bravo Sundae siêu ngon mới ra mắt của Swensen’s.`,
    image: require('../res/image/image 12.png').default
  },
  {
    id: 2,
    name: ' BẠN ĐÃ THỬ TRẢI NGHIỆM TUYẾT RƠI GIỮA MÙA HÈ TẠI Kemnhanonline CHƯA ?',
    description: `Ồ chuyện gì sao nghe lạ lùng quá vậy ? Đừng ngạc nhiên, đấy chính là bộ sưu tập Bingsu kem tuyết mát lạnh đang khiến các fan nhà kemnhanonline đứng ngồi không yên đây mà.
    Gồm toàn những vị cực đỉnh như dâu chuối, trà xanh, xoài,… Từng lớp, từng lớp tuyết sữa mát lạnh, sẽ khiến bạn sảng khoái không thể thốt nên lời.`,
    image: require('../res/image/image 13.png').default
  },
  {
    id: 3,
    name: 'MUA 1 TẶNG 1',
    description: `Kemnhanonline KHAO BẠN 1 LY KEM DỪA PHIÊN BẢN ĐẶC BIỆT !!!
    Tương truyền ai thấy bài viết này, vừa @Tag vừa Share về tường mình thì không sớm hay muộn bạn cũng sẽ được khao ăn kem thỏa thích.
    Cơ mà nếu chưa thấy ai ngỏ lời thì thứ 3 tuần này vẫn cứ ghé Swensen’s để bọn mình khao bạn 1 ly kem dừa phiên bản đặc biệt ngập tràn topping siêu ngon nhé !!!
    (*) Ưu đãi áp dụng khi MUA 1 scoop kem vị bất kì kèm topping, TẶNG NGAY 1 ly kem dừa Coconut Bravo Sundae siêu ngon mới ra mắt của kemnhanonline.`,
    image: require('../res/image/image 13.png').default
  },
  {
    id: 4,
    name: 'THỨ 4 - ĐẠI CHIẾN ƯU ĐÃI',
    description: `Kemnhanonline KHAO BẠN 1 LY KEM DỪA PHIÊN BẢN ĐẶC BIỆT !!!
    Tương truyền ai thấy bài viết này, vừa @Tag vừa Share về tường mình thì không sớm hay muộn bạn cũng sẽ được khao ăn kem thỏa thích.
    Cơ mà nếu chưa thấy ai ngỏ lời thì thứ 3 tuần này vẫn cứ ghé Swensen’s để bọn mình khao bạn 1 ly kem dừa phiên bản đặc biệt ngập tràn topping siêu ngon nhé !!!
    (*) Ưu đãi áp dụng khi MUA 1 scoop kem vị bất kì kèm topping, TẶNG NGAY 1 ly kem dừa Coconut Bravo Sundae siêu ngon mới ra mắt của kemnhanonline.`,
    image: require('../res/image/image 13.png').default
  },

]
const API_DETAIL_NEWS = []

export { API_URL, userData, API_NEWS };