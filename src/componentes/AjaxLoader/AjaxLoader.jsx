import { dotWave } from 'ldrs'
dotWave.register()
const AjaxLoader = () => {

    return (
        <div className='align-items-center justify-content-center text-center'>
            <l-dot-wave
            size="47"
            speed="1" 
            color="#fcb300" />
        </div>
    )
}

export default AjaxLoader;



