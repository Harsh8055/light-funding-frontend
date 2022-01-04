import 'tailwindcss/tailwind.css'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
      <div>
        <a href='https://forms.gle/c2pj7cdLghFZiBFR7' target='_blank' className="fixed bottom-5 bg-white right-14 rounded-lg p-1 hover:scale-125 duration-200">
          <p className='font-bold text-lg flex justify-center items-center'>
            <img src="https://img.icons8.com/dotty/30/000000/feedback.png" className='mr-1' />
            Feedback
          </p>
        </a>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
