import "../../styles/Title.scss"

const Title = ({title}) => {
    return (
        <div className='sc-title text-center'>
            <h3 className='text-capitalize'>{title}</h3>
            
        </div>
    )
    }

export default Title;