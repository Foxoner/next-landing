import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Form from '../components/Form/Form';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

import Preloader from '../assets/Preloader.png';
import RegSuccess from '../assets/success-image.svg';

import styles from '../styles/App.module.scss';
import Image from 'next/image';

function Index({ users }) {
  const [mainUsers, setMainUsers] = useState(users);
  const [isRegistred, setIsRegistred] = useState(false);
  const [count, setCount] = useState(0);

  // LocalStorage after Rendering
  useEffect(() => {
    if (localStorage.getItem('newUsers') == null) {
      localStorage.setItem('newUsers', '[]')
    } 
    if (localStorage.getItem('newUsers') !== '[]') {
      setMainUsers(JSON.parse(localStorage.getItem('newUsers')))
    }
  },[])

  const checkForm = (userData) => {
    localStorage.setItem('newUsers', JSON.stringify([userData, ...JSON.parse(localStorage.getItem('newUsers'))]))
    setMainUsers([userData, ...mainUsers])
    setIsRegistred(true)
  }

  const onShowMoreUsers = () => {
    if (mainUsers.length / (count + 6) < 1) {
      setCount(0)
    } else {
      setCount(count + 6)
    }
    
  }
  
  return (
    <>
      <Head>
        <title>Start your way</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <div className={styles.App}>
          <header>
              <Header />
          </header>
          <main className={styles['app-container']}>
              <div className={styles['app-container__img-el']}>
              <div className={styles['app-container__img-el__content']}>
                  <h1>Join our development team</h1>
                  <p>What defines a good front-end developer is one that has skilled knowledge of HTML, 
                  CSS, JS with a vast understanding of User design thinking as they'll be 
                  building web interfaces with accessibility in mind. They should also be excited to learn, as the world of 
                  Front-End Development keeps evolving.</p>
              </div>
              </div>
              <div className={styles['app-container__get-block-el']}>
              <h1 id='get_req'>Project Candidates</h1>
              {mainUsers.length ? 
              <div className={styles['app-container__get-block-el__users']}>
                  {mainUsers.slice(count, count + 6).map(item => <Card key={item.email} user={item} />)}
              </div> 
              : 
              <div>
                  <div className={styles.preloader}>
                    <Image src={Preloader} alt='preloader' />
                  </div>
              </div>
              }
              <div onClick={() => onShowMoreUsers()}>
                  {mainUsers.length / (count + 6) <= 1 ?
                  <Button label={`That's it, back to Start`} />
                  :
                  <Button label='Show more' />
                  }
              </div>
              </div>
              <div className={styles['app-container__form-el']}>
              {isRegistred ? 
                  <div className={styles['app-container__form-el__registred']}>
                    <h1>User successfully registered</h1>
                    <RegSuccess className={styles.success_img} alt='registration done'/>
                  </div>
                  :
                  <div id='form'>
                  <Form checkForm={checkForm} />
                  </div>
              }
              </div>
          </main>
      </div>
    </>
  );
}

export default Index;

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  users.forEach(item => {
    if (!item.hasOwnProperty('photo')) {
      item.photo = `https://robohash.org/${item.phone}.png?size=200x200`
    }
  })
  
  return {
    props: {users},
  }
}