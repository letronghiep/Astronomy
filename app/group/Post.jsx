import React from 'react'
import styles from './group.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faEye, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'

function Post() {
  return (
    <div className = {styles.post}>
        <div className = {styles.post_header}>
            <div className={styles.post_image}>
                <div className={styles.group_img}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/250px-Crab_Nebula.jpg" alt="abc" />
                </div>
                <div className = {styles.user_img}>
                    <img src="https://i.pinimg.com/474x/e1/c6/f9/e1c6f998ec506bbbf0b2d7f00e646b46.jpg" alt="" />
                </div>
            </div>
            <div className = {styles.post_info}> 
                <div>
                    <span className = {styles.group_name}>Thiên Văn Học - Khoa Học - Suy Luận</span>
                </div>
                <div className = {styles.post_user}>
                    <p className = {styles.post_username}>Hồ Văn Đức</p>
                    <p className = {styles.post_date}>20/08/2024</p>
                </div>
            </div>
        </div>
        <div className = {styles.post_body}>
            
        </div>
        <div className = {styles.post_footer}>
            <div className={styles.post_analysis}>
                <div className={styles.left}>
                    <div className={styles.likes}><FontAwesomeIcon className = {styles.control_icon} icon={faThumbsUp}/>500</div>
                    <div className={styles.views}><FontAwesomeIcon className = {styles.control_icon} icon={faEye}/>700</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.comments}><FontAwesomeIcon className = {styles.control_icon} icon={faComment}/>10</div>
                    <div className={styles.shares}><FontAwesomeIcon className = {styles.control_icon} icon={faShareNodes}/>100</div>
                </div>
            </div>
            <div className={styles.post_control}>
                <div className={styles.like}><FontAwesomeIcon className = {styles.control_icon} icon={faThumbsUp}/>Like</div>
                <div className={styles.comment}><FontAwesomeIcon className = {styles.control_icon} icon={faComment}/> Comment</div>
                <div className={styles.share}><FontAwesomeIcon className = {styles.control_icon} icon={faShareNodes}/> Share</div>
            </div>
        </div>
    </div>
  )
}

export default Post