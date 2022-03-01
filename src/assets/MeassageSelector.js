import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';


export const MeassageSelector = ({id, width, height}) => {
    switch (id) {
        case 'my_meassage':
            return (
                <Svg width={width} height={height} viewBox="0 0 97 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect width={width} height={height} rx="11" fill="#60687E"/>
                </Svg>
            );
        case 'new_my_meassage':
            return (
                <Svg width={width} height={height} viewBox="0 0 109 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M3 11.1961C3 5.01192 8.0133 0 14.1975 0H97.8025C103.987 0 109 5.0133 109 11.1975V21.8025C109 27.9867 103.987 33 97.8025 33H19.8079C15.5375 33 11.3371 31.9145 7.6014 29.8456L6.99845 29.5116C4.19907 32.3023 0 33 0 33C0 33 3 28.1163 3 25.3256C3 23.8975 3 17.2992 3 11.1961Z" fill="#60687E"/>
                </Svg>
            );
        case 'you_meassage':
            return (
                <Svg width={width} height={height} viewBox="0 0 97 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect width={width} height={height} rx="11" fill="#232532"/>
                </Svg>
            );
        case 'new_you_meassage':
            return (
                <Svg width={width} height={height} viewBox="0 0 97 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M94.3303 11.1978C94.3303 5.01362 89.317 0 83.1328 0H11.1975C5.01329 0 2.98023e-07 5.0133 2.98023e-07 11.1975V16.8025C2.98023e-07 22.9867 5.0133 28 11.1975 28H78.9233C83.0237 28 87.062 26.9992 90.6879 25.0846L90.772 25.0402C93.2632 27.408 97 28 97 28C97 28 94.3303 23.8562 94.3303 21.4884C94.3303 20.4084 94.3303 15.8439 94.3303 11.1978Z" fill="#232532"/>
                </Svg>
       
            );
            
        default:
            return null;
    }
};