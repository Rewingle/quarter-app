
import React from "react";
//import { Container, Box } from "theme-ui";
import Post from "../../../Components/Post/Post.js";
import {getFeed} from '../../../../lib/getFeed.js';


export default async function Page() {



    let posts = await getFeed();

    /*     const posts = [    {
            fullname: 'Aylin Barış',
            profilePic: 'https://storage.googleapis.com/lookal/image.jpg',
            text: 'Merhaba bu benim uygulamaaaaaaaaadaki ilk postum. Acaba biri bana etrafda iyi bir veteriner önerebilir mi? Teşekkürler...',
            location: 'Acıbadem, Kadıköy',
            date: '14 Jan',
            likes: 12
        },
        {
            fullname: 'Kerem Dolunay',
            profilePic: 'https://storage.googleapis.com/lookal/user2.jpg',
            text: 'Hukukçular sitesinin etrafında çok sayıda başıboş köpek var. Gece dışarıda gezmeye korkar olduk sayıları çok fazla. İmza falan toplasak acaba belediye buna bir çare bulur mu?',
            location: 'Acıbadem, Kadıköy',
            date: '15 Jan',
            likes: 58
        },
        {
            fullname: 'Harun Taş Kaya',
            profilePic: 'https://storage.googleapis.com/lookal/user3.jpg',
            image:'https://storage.googleapis.com/lookal/post1.jpeg',
            text: 'Elimde fazladan bir adet 36 inc sony televizyon var ihtiyacı olana verebilirim. Kumandası da dahil çalışıyor.',
            location: 'Acıbadem, Kadıköy',
            date: '11 Jan',
            likes: 24
        },
        {
            fullname: 'Yeşim Polat',
            profilePic: 'https://storage.googleapis.com/lookal/user4.jpg',
            text: 'Tandığınız yakınlarda iyi bir elektrikçi var mı? Bu aralar sigorta sebepsiz yere atıyor...',
            location: 'Acıbadem, Kadıköy',
            date: '7 Jan',
            likes: 16
        }]
     */

    return (
        <React.Fragment>


            <ul style={{ width: '42em' }}>

                {posts?.map(({ fullname, profilePic, text, image, location, date, likes }, index) => (
                    <React.Fragment>
                        <li key={index}><Post fullname={fullname} profilePic={profilePic} text={text} image={image} location={location} date={date} likes={likes} /></li>
                        <br />
                    </React.Fragment>
                ))}
            </ul>

        </React.Fragment>
    )
}


const styles = {
    grid: {
        display: ['flex', 'flex', 'flex', 'flex', 'grid'],
        gridTemplateColumns: '2fr 3fr 2fr'
    },

    feedBar: {
        width: '100%',
        p: 3,

    },
    feedBarContainer: {
        width: '100%',
        height: '100vh'
    },

}