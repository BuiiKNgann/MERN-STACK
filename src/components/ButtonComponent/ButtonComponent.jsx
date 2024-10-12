// import { Button } from 'antd'
// import React from 'react'

// const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
//     return (
//         <Button
//         style={{
//             ...styleButton,
//             background: disabled ? '#ccc' : styleButton.background
//         }}
//             size={size}
           

//             // để nhận icon search để ButtonComponent nhận thì dùng rest
//             {...rests}
//         >

//             <span style={styleTextButton}>{textButton}</span></Button>
//     )
// }

// export default ButtonComponent
import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background,
                cursor: disabled ? 'not-allowed' : 'pointer', // Đổi con trỏ chuột nếu disabled
            }}
            size={size}
            disabled={disabled}   
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;
