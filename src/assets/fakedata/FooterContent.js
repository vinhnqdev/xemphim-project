export const footerData = [
  "Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất",
  "Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)",
  "Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube)",
  "Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao",
  "Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online",
  "Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề phim",
];

export const faqData = [
  {
    title: "Xem phim bị chậm, mặc dù đã kích hoạt VIP Mode cho phim đó?",
    nestedlist: {
      title:
        "Nếu phim chạy nhưng cứ một đoạn lại bị dừng để chờ load tiếp (dù đã thử chọn các server khác nhau), cần xác định do thiết bị hay do mạng của bạn.",
      nestedItem: [
        "Hãy thử xem phim trên một thiết bị khác (máy tính / điện thoại / TV...). Phần lớn mọi người khi đổi sang thiết bị khác thì phim lại chạy mượt => vậy là do thiết bị cũ của bạn. Nếu đó là TV, hãy kiểm tra thiết lập TV và tắt giao thức kết nối mạng IPv6. Nếu đó là một thiết bị chạy iOS, thì hãy thử dùng một trình duyệt khác (chẳng hạn Chrome) thay vì trình duyệt Safari mặc định, nhưng nói chung player trên iOS rất hay có vấn đề với phim bitrate cao + âm thanh 5.1.",
        "Nếu phim chạy chậm trên tất cả các thiết bị mà bạn thử, với tất cả các server, thì đó là do nhà mạng của bạn đã bóp băng thông đường truyền quốc tế. Có 2 cách giải quyết: 1. Gọi điện phản ánh với nhà mạng; 2. Sử dụng một VPN (mạng riêng ảo) để tăng tốc độ cho mạng của bạn. Chúng tôi đề xuất bạn dùng ứng dụng WARP",
      ],
    },
  },
  {
    title:
      "Gặp vấn đề về âm thanh: phim không có tiếng, mất tiếng nhân vật, hoặc âm thanh bị rè?",
    nestedlist: {
      title: null,
      nestedItem: [
        "Nếu xem trên điện thoại: Lỗi âm thanh là do trình duyệt của bạn (thường là Chrome). Hãy cài & dùng trình duyệt Firefox!",
        "Nếu bạn xem trên PC: Khác với phim / clip trên các web khác (kể cả Youtube), phim trên XemPhim sử dụng âm thanh 5.1 (6 channel) thay vì âm thanh stereo (2 channel). Nếu thiết bị bạn xem chỉ có 2 loa, bạn cần thiết lập chương trình quản lý âm thanh trên thiết bị cho đúng: chọn đúng chế độ với số loa mình có (stereo), đừng chọn nhiều hơn, nếu không thiết bị của bạn sẽ cố gắng xuất âm thanh ra những loa không tồn tại => mất tiếng.Ví dụ đây là phần chọn các chế độ âm thanh của Realtek HD Audio Manager: click vào đây",
      ],
    },
  },
  {
    title: "Làm sao để xem phim trên TV?",
    nestedlist: {
      title:
        "Để xem phim trên TV, TV bạn phải có trình duyệt web. Hầu hết các loại Smart TV những năm gần đây đều có cài sẵn trình duyệt. Nếu TV bạn không có sẵn trình duyệt, bạn có thể cài trình duyệt từ cửa hàng ứng dụng (Google Play Store / CH Play / App Store) trên TV. Với TV Android, bạn nên cài trình duyệt Puffin.Sau khi cài trình duyệt, truy cập trang web như bạn vẫn làm trên máy tính / điện thoại và xem phim.",
      nestedItem: [],
    },
  },
];
