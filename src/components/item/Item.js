import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";


export const Item = ({ item }, viewHandler, dataRoot) => {
    const actionHandler = (url) => {

    }

    return (
        <View style={styles.rootSt} key={item.id.toString()}>
            <View
            style={styles.gipol}
            key={item.id.toString()}
            >
            
            <Pressable 
            style={styles.root}
            key={item.id.toString()}
            onPress={() => viewHandler(item)}
            >
                <View style={styles.line}>
                    <View style={styles.line_dop}>
                    <View style={styles.circl} />
                    <View style={styles.bling}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.title
                        ]}
                        >
                            {item.name}
                        </Text>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.name
                        ]}
                        >
                            {item.description}
                        </Text>
                    </View>
                    </View>

                    <View style={styles.wrapper_l}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.price
                        ]}
                        >
                            {item.address}
                        </Text>
                        {item.deadline ? (
                            <Text
                            style={[
                                GlobalStyle.CustomFontBold,
                                styles.date,
                            ]}
                            >
                                {item.deadline}
                            </Text>
                        ) : null}
                        
                    </View>

                    
                </View>
                
            </Pressable>
            </View>
        </View>
    );
}

