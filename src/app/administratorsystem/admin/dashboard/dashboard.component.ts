import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';

  announcements: { date: string, message: string }[] = [
    { date: '2024-06-22', message: '📢 Thông báo mới về lịch thi học kỳ 1 đã được đăng tải. Vui lòng kiểm tra và thông báo cho học sinh.' },
    { date: '2024-06-18', message: '📚 Cuộc họp phụ huynh toàn trường sẽ diễn ra vào ngày 30/06. Đề nghị các giáo viên chuẩn bị báo cáo kết quả học tập.' },
    { date: '2024-06-15', message: '🎉 Chúc mừng ngày Nhà giáo Việt Nam 20/11! Xin gửi lời cảm ơn chân thành đến tất cả các thầy cô.' }
  ];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userName = this.authenticationService.getUserName();
  }
}
