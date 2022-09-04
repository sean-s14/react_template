
import logo512 from 'static/images/logo512.png';

const LoadingScreen = (props) => {

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <img src={logo512} alt="React Logo" />
        </div>
    )
}

export default LoadingScreen;