import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SlideUp from './SlideUp';
import '../stylesheet/Awards.css';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const awardsData = [
    {
        title: 'Giải Khuyến Khích "Tin học Trẻ" toàn quốc lần thứ 31',
        year: '2025',
        icon: <FaAward />,
        color: '#FFD700'
    },
    {
        title: 'Giải Nhất "Tin học Trẻ" khu vực miền Nam',
        year: '2025',
        icon: <FaTrophy />,
        color: '#FFD700'
    },
    {
        title: 'Giải Nhì "Tin học Trẻ" cấp Thành phố',
        year: '2025',
        icon: <FaMedal />,
        color: '#C0C0C0'
    },
    {
        title: 'Giải Nhì "Nghiên cứu KHKT" cấp Thành phố – Phần mềm hệ thống',
        year: '2024–2025',
        icon: <FaMedal />,
        color: '#C0C0C0'
    },
    {
        title: 'Huy chương Đồng “Thiết kế, chế tạo, ứng dụng” lần thứ 13',
        year: '2025',
        icon: <FaMedal />,
        color: '#CD7F32'
    },
    {
        title: 'Giải Nhì “HSU Programming Challenge”',
        year: '2025',
        icon: <FaMedal />,
        color: '#C0C0C0'
    },
    {
        title: 'Giải Nhì "Nghiên cứu KHKT" cấp Thành phố – Phần mềm hệ thống',
        year: '2023–2024',
        icon: <FaMedal />,
        color: '#C0C0C0'
    },
    {
        title: 'Giải Khuyến Khích "Tin học Trẻ" cấp Thành phố',
        year: '2024',
        icon: <FaAward />,
        color: '#94a3b8'
    },
    {
        title: 'Giải Khuyến Khích trong cuộc thi “Sân chơi sáng tạo cùng AI trong khuôn khổ Ngày hội Khoa học Vũ Trụ”',
        year: '2024',
        icon: <FaAward />,
        color: '#94a3b8'
    },
    {
        title: 'Giải Khuyến Khích Cuộc thi "Markethon"',
        year: '2024',
        icon: <FaAward />,
        color: '#94a3b8'
    },
    {
        title: 'Huy chương Đồng “Thiết kế, chế tạo, ứng dụng” lần thứ 11',
        year: '2023',
        icon: <FaMedal />,
        color: '#CD7F32'
    },
    {
        title: 'Giải Khuyến Khích "Sáng tạo thanh thiếu niên nhi đồng" lần thứ 18',
        year: '2023',
        icon: <FaAward />,
        color: '#94a3b8'
    }
];

const Awards = () => {
    return (
        <Container id="awards" fluid className="awards-bg py-5">
            <Container>
                <SlideUp>
                    <div className="text-center mb-5">
                        <h2 className="Xawards">Achievements & Awards</h2>
                        <p className="text" style={{ color: '#aaa' }}>Recognition for my research and technical achievements</p>
                    </div>
                </SlideUp>

                <Row className="justify-content-center">
                    {awardsData.map((award, index) => (
                        <Col key={index} lg={6} className="mb-4">
                            <SlideUp>
                                <div className="award-item">
                                    <div className="award-icon" style={{ borderColor: award.color, color: award.color }}>
                                        {award.icon}
                                    </div>
                                    <div className="award-info">
                                        <span className="award-year">{award.year}</span>
                                        <h4 className="award-title">{award.title}</h4>
                                    </div>
                                </div>
                            </SlideUp>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Awards;