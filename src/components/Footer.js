import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = (props) => {
  const github = <FontAwesomeIcon icon="fa-brands fa-github-alt" className='fa-xl'/>
  return (
    <footer className='bg-red-700 text-white border-t-4 pt-1 pb-5 border-red-500'>
      <div className='flex flex-row items-center justify-between border-red-500 px-10'>
        <div className=" p-5 inline-flex">
          <img src="/logo_fries.png" alt="logo" className='App-logo' />
          <h3 className="self-center">Almuerzos San Joaquín</h3>
        </div>
      </div>

      <div className="my-4 mx-20  border-red-200 border-t-2"></div>

      <div className="mx-10 flex flex-row justify-between px-5">
        <div className='flex justify-items-center items-center flex-col'>
          <h3 className='font-bold'>Grupo 13</h3>
          <a href='https://github.com/IIC2513-1/Proyecto-IIC2513-1-grupo-13'>
          {github}
          </a>
        </div>
        <div className='flex justify-items-center flex-col items-center'>
          <h4 className='font-bold'>Benjamín Caro</h4>
          <p><a href='mailto:bcaro@uc.cl'>bcaro@uc.cl</a></p>
        </div>
        <div className='flex justify-items-center flex-col items-center'>
          <h4 className='font-bold'>Alejandro López</h4>
          <p><a href='mailto:alpt@uc.cl'>alpt@uc.cl</a></p>
        </div>
        <div className='flex justify-items-center flex-col items-center'>
          <h4 className='font-bold'>José Vilchez</h4>
          <p><a href='mailto:jgvilchez@uc.cl'>jgvilchez@uc.cl</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;