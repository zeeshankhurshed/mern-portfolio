// @ts-nocheck
import About from '@/components/sub-component/About'
import Contact from '@/components/sub-component/Contact'
import Hero from '@/components/sub-component/Hero'
import Portfolio from '@/components/sub-component/Portfolio'
import Skills from '@/components/sub-component/Skills'
import Timeline from '@/components/sub-component/Timeline'
import MyApps from '@/components/sub-component/MyApps'
import Footer from '@/components/Footer'


const Home = () => {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24  sm:mx-auto w-full max-w-[1050px] flex flex-col gap-4'>
      <Hero/>
      <Timeline/>
      <About/>
      <Skills/>
      <Portfolio/>
      <MyApps/>
      <Contact/>
      <Footer/>
    </article>
  )
}

export default Home
