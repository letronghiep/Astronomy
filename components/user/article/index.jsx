import React from 'react'

import Audio from './audio';

import styles from './article.module.css';


function Article({slug}) {



  return (
    <div className={styles.article}>
        <div className={styles.header}>
            <div className = {styles.left}>
                <h2 className = {styles.title}>Mặt trời</h2>
                <p className = {styles.des}>
                    Cách Trái đất gần 150 triệu km, Mặt trời là trái tim của hệ mặt trời, giữ cho hành tinh của chúng ta ấm áp để các sinh vật có thể phát triển mạnh mẽ
                </p>
                <Audio />
            </div>
            <div className = {styles.right}>
                <div>
                    <p>Tác giả: Hồ Văn Đức</p>
                    <p>Ngày đăng: 20-08-2024</p>
                    <p>Thời lượng: 26 giây</p>
                </div>
            </div>
        </div>
        <div className={styles.body}>
            <p>Mặt trời là ngôi sao nằm ở trung tâm của hệ Mặt Trời, là nguồn năng lượng chính mà hệ Mặt Trời chúng ta phụ thuộc vào. Nó là một cầu hình cầu, có đường kính khoảng 1,392,000 km (khoảng 109 lần đường kính của Trái Đất) và khối lượng gần 333,000 lần khối lượng của Trái Đất. Mặt trời chiếm khoảng 99.86% tổng khối lượng của hệ Mặt Trời, với phần còn lại chủ yếu là các hành tinh, mặt trăng, sao và vật thể nhỏ.</p>
            <br />
            <iframe width="500" height="350" src="https://www.youtube.com/embed/NJbQS49ep6c?si=y9z-335177TCNrtU" title="YouTube video player"  allowfullscreen></iframe>
            <br></br>
            <p>Mặt trời tỏa ra ánh sáng và nhiệt động năng do quá trình hạt nhân hợp lên từ những phản ứng hạt nhân trong lõi nó. Năng lượng từ mặt trời điều chỉnh khí hậu và môi trường trên Trái Đất, cung cấp nguồn năng lượng cho sự sống và quy trình sinh thái. Sự phát quang của mặt trời diễn ra chủ yếu trong dải sóng quang học và tia X. Điều này tạo ra một loạt các hiện tượng, bao gồm ánh sáng mặt trời, bức xạ nhiệt, và cảnh vật mạng không gian như hiện tượng Ánh sáng Bắc cực và Ánh sáng Nam cực.</p>
            <br/>
            <img src = "https://i1-vnexpress.vnecdn.net/2020/05/21/VNE-Base-1-1326-1590031772.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=LIAOyDvKMkGcKu83ToO9NA"/>
            <br></br>
            <p>Mặt trời cũng có các cấu trúc phức tạp như những vùng nhũ địa, sự phong phú của các bão mặt trời và các hoạt động khác tạo ra các hiện tượng như những ngọn lửa mặt trời và cột khí lạnh. Các thiên thể này có ảnh hưởng lớn đến các hệ thống vũ trụ và các mạng điện từ trên Trái Đất.</p>
        </div>
        
    </div>
  )
}

export default Article