const mekong = {
  1874283: 'Cần Thơ',
  1875866: 'Đồng Tháp',
  1875887: 'Vĩnh Long',
  1873642: 'Trà Vinh',
  1875748: 'An Giang',
  1876011: 'Tiền Giang',
  1877236: 'Long An',
  1875968: 'Bến Tre',
  1873632: 'Sóc Trăng',
  1874471: 'Kiên Giang',
  1874249: 'Hậu Giang',
  1873490: 'Cà Mau',
  1873533: 'Bạc Liêu',
}

const southEast = {
  1904421: 'Đồng Nai',
  1898961: 'Tây Ninh',
  1886159: 'Ninh Thuận',
  1904231: 'Bình Thuận',
  1898841: 'Bình Phước',
  1906037: 'Bình Dương',
  1904296: 'Bà Rịa - Vũng Tàu',
  1973756: 'Ho Chi Minh City',
}

const centralHighlands = {
  1879515: 'Kon Tum',
  1884018: 'Gia Lai',
  1884042: 'Đắk Nông',
  1884034: 'Đắk Lắk',
  1885367: 'Lâm Đồng',
}

const southCentralCoast = {
  1891418: 'Đà Nẵng',
  1891352: 'Quảng Nam',
  1890793: 'Quảng Ngãi',
  1889794: 'Bình Định',
  1889204: 'Phú Yên',
  1887959: 'Khánh Hòa',
  1886159: 'Ninh Thuận',
  1904231: 'Bình Thuận',
}

const northCentralCoast = {
  1891483: 'Thừa Thiên Huế',
  1898590: 'Thanh Hóa',
  1895630: 'Quảng Trị',
  1896050: 'Quảng Bình',
  1898509: 'Nghệ An',
  1898458: 'Hà Tĩnh',
}
const redRiverDelta = {
  1902889: 'Vĩnh Phúc',
  1901019: 'Thái Bình',
  1900963: 'Ninh Bình',
  1901008: 'Nam Định',
  1901032: 'Hưng Yên',
  1901010: 'Hà Nam',
  1902686: 'Hải Dương',
  1902690: 'Bắc Ninh',
  1903516: 'Hà Nội',
  1902682: 'Hải Phòng',
}
const northeast = {
  1902947: 'Quảng Ninh',
  1902941: 'Bắc Giang',
  1902930: 'Phú Thọ',
  1903478: 'Hà Giang',
  1903418: 'Tuyên Quang',
  1844412: 'Cao Bằng',
  1903471: 'Bắc Kạn',
  1902967: 'Thái Nguyên',
  5522596: 'Lạng Sơn',
}

// Quite troublesome as OSM is missing district data of this region
const northwest = {
  1902973: 'Hòa Bình',
  1903291: 'Sơn La',
  1903340: 'Điện Biên',
  1903322: 'Lai Châu',
  1903400: 'Lào Cai',
  1903199: 'Yên Bái',
}

export const regions = {
  mekong,
  southEast,
  centralHighlands,
  southCentralCoast,
  northCentralCoast,
  redRiverDelta,
  northeast,
  northwest,
}

export const provinces = {
  ...mekong,
  ...southEast,
  ...centralHighlands,
  ...southCentralCoast,
  ...northCentralCoast,
  ...redRiverDelta,
  ...northeast,
  ...northwest,
}
