// Total 43 countries
export const countriesData = [
  {
    iso_3166_1: "US",
    english_name: "United States of America",
    native_name: "Mỹ",
  },
  {
    iso_3166_1: "KR",
    iso_639_1: "ko",
    english_name: "South Korea",
    native_name: "Hàn Quốc",
  },
  {
    iso_3166_1: "GB",
    english_name: "United Kingdom",
    native_name: "Anh",
  },
  {
    iso_3166_1: "FR",
    english_name: "France",
    native_name: "Pháp",
  },
  {
    iso_3166_1: "CA",
    english_name: "Canada",
    native_name: "Canada",
  },
  {
    iso_3166_1: "HK",
    english_name: "Hong Kong",
    native_name: "Hồng Kông",
  },
  {
    iso_3166_1: "JP",
    english_name: "Japan",
    native_name: "Nhật Bản",
  },
  {
    iso_3166_1: "CN",
    english_name: "China",
    native_name: "Trung Quốc",
  },
  {
    iso_3166_1: "TW",
    english_name: "Taiwan",
    native_name: "Đài Loan",
  },
  {
    iso_3166_1: "IN",
    english_name: "India",
    native_name: "Ấn Độ",
  },
  {
    iso_3166_1: "TH",
    english_name: "Thailand",
    native_name: "Thái Lan",
  },
  {
    iso_3166_1: "AU",
    english_name: "Australia",
    native_name: "Úc",
  },
  {
    iso_3166_1: "VN",
    iso_639_1: "vi",
    english_name: "Vietnam",
    native_name: "Việt Nam",
  },
  {
    iso_3166_1: "DE",
    english_name: "Germany",
    native_name: "Đức",
  },
  {
    iso_3166_1: "IT",
    english_name: "Italy",
    native_name: "Ý",
  },
  {
    iso_3166_1: "HU",
    english_name: "Hungary",
    native_name: "Hungary",
  },
  {
    iso_3166_1: "IE",
    english_name: "Ireland",
    native_name: "Ai-len",
  },
  {
    iso_3166_1: "MT",
    english_name: "Malta",
    native_name: "Malta",
  },
  {
    iso_3166_1: "NZ",
    english_name: "New Zealand",
    native_name: "New Zealand",
  },
  {
    iso_3166_1: "RU",
    english_name: "Russia",
    native_name: "Nga",
  },
  {
    iso_3166_1: "IS",
    english_name: "Iceland",
    native_name: "Iceland",
  },
  {
    iso_3166_1: "FI",
    english_name: "Finland",
    native_name: "Phần Lan",
  },
  {
    iso_3166_1: "CO",
    english_name: "Colombia",
    native_name: "Colombia",
  },
  {
    iso_3166_1: "DK",
    english_name: "Denmark",
    native_name: "Đan Mạch",
  },
  {
    iso_3166_1: "BE",
    english_name: "Belgium",
    native_name: "Bỉ",
  },
  {
    iso_3166_1: "ES",
    english_name: "Spain",
    native_name: "Tây Ban Nha",
  },
  {
    iso_3166_1: "AR",
    english_name: "Argentina",
    native_name: "Argentina",
  },
  {
    iso_3166_1: "NL",
    english_name: "Netherlands",
    native_name: "Hà Lan",
  },
  {
    iso_3166_1: "NO",
    english_name: "Norway",
    native_name: "Na Uy",
  },
  {
    iso_3166_1: "SG",
    english_name: "Singapore",
    native_name: "Singapore",
  },
  {
    iso_3166_1: "PL",
    english_name: "Poland",
    native_name: "Ba Lan",
  },
  {
    iso_3166_1: "MY",
    english_name: "Malaysia",
    native_name: "Malaysia",
  },
  {
    iso_3166_1: "ID",
    english_name: "Indonesia",
    native_name: "Indonesia",
  },
  {
    iso_3166_1: "PR",
    english_name: "Puerto Rico",
    native_name: "Puerto Rico",
  },
  {
    iso_3166_1: "IR",
    english_name: "Iran",
    native_name: "Iran",
  },
  {
    iso_3166_1: "NP",
    english_name: "Nepal",
    native_name: "Nepal",
  },
  {
    iso_3166_1: "KH",
    english_name: "Cambodia",
    native_name: "Campuchia",
  },
  {
    iso_3166_1: "PH",
    english_name: "Philippines",
    native_name: "Philippin",
  },
  {
    iso_3166_1: "TR",
    english_name: "Turkey",
    native_name: "Thổ Nhĩ Kỳ",
  },
  {
    iso_3166_1: "MA",
    english_name: "Morocco",
    native_name: "Ma-rốc",
  },
  {
    iso_3166_1: "BR",
    english_name: "Brazil",
    native_name: "Brazil",
  },
  {
    iso_3166_1: "MX",
    english_name: "Mexico",
    native_name: "Mexico",
  },
  {
    iso_3166_1: "CZ",
    english_name: "Czech Republic",
    native_name: "Cộng hòa Séc",
  },
];

export const durationData = [
  { value: "0-60", durationTitle: "Dưới 1 tiếng" },
  { value: "60-90", durationTitle: "1 - 1.5 tiếng" },
  { value: "90-120", durationTitle: "1.5 - 2 tiếng" },
  { value: "120-150", durationTitle: "2 - 2.5 tiếng" },
  { value: "150-0", durationTitle: "Trên 2.5 tiếng" },
];

const getYears = () => {
  const arr = [];
  for (let i = 2021; i > 2009; i--) {
    arr.push(i);
  }
  return arr;
};

export const yearsData = getYears();
