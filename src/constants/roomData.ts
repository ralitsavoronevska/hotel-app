import firstImage from '@/assets/images/1.jpg'
import secondImage from '@/assets/images/2.jpg'
import thirdImage from '@/assets/images/3.jpg'
import fourthImage from '@/assets/images/4.jpg'
import fifthImage from '@/assets/images/5.jpg'
import sixthImage from '@/assets/images/6.jpg'
import seventhImage from '@/assets/images/7.jpg'
import eighthImage from '@/assets/images/8.jpg'

export interface RoomImage {
  id: number
  image: string
}

export const ROOM_IMAGES: RoomImage[] = [
  { id: 1, image: firstImage },
  { id: 2, image: secondImage },
  { id: 3, image: thirdImage },
  { id: 4, image: fourthImage },
  { id: 5, image: fifthImage },
  { id: 6, image: sixthImage },
  { id: 7, image: seventhImage },
  { id: 8, image: eighthImage },
]
