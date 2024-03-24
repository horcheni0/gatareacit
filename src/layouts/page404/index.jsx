import page404 from './page404.css'
import logo from '../../assets/img/navbar/datadoit.png'
import React from 'react'

const Page404 = () => {
  return (
    <div className='h-screen block'><body class="bg-purple">
        
    <div class="stars">
        <div class="custom-navbar">
            <div class="brand-logo">
                <img src={logo} width="80px" alt=''/>
                <p className='p1'>DataDoIt</p>
            </div>
        </div>
        <div className="central-body block">
            <img class="image-404" alt='' src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
            <a   href="/" class="btn-go-home" target="_blank">Go Back Home</a>
        </div>
        <div class="objects">
            <img class="object_rocket"alt=''  src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
            <div class="earth-moon">
                <img alt='' class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                <img alt='' class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
            </div>
            <div class="box_astronaut">
                <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
            </div>
        </div>
        <div class="glowing_stars">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>

        </div>

    </div>

</body></div>
  )
}

export default Page404