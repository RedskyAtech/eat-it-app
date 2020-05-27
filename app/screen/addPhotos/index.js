import React, { Component } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-picker';

export default class addPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }
    onLaunchCamera = () => {
        let options = {
            cameraType: 'front',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                var joined = this.state.photos.concat({ uri: response.uri });
                this.setState({ photos: joined })
            }
        });
    };
    onRemove = async (item) => {
        let index = this.state.photos.indexOf(item);
        this.state.photos.splice(index, 1)
        let joined = this.state.photos
        await this.setState({ photos: joined })
    }
    onBack = async () => {
        this.props.navigation.navigate('tab1');
    }
    render() {
        const { container, inner_container, bottom_container, photo_continer, spacing, centered_text, cross_container, cross_icon, row_list, photo_style, forward_container, row, arrow, column, heading_text, between_spacing, add_style } = styles
        return (
            <View style={[container, column, between_spacing]}>
                <View>
                    <View style={[inner_container, row, between_spacing, spacing]}>
                        <TouchableOpacity onPress={this.onBack}><Image resizeMode='contain' source={require('../../assets/back_arrow.png')} style={arrow}></Image></TouchableOpacity>
                        <Text style={heading_text}>Attach photos</Text>
                        <View><Text>     </Text></View>
                    </View>

                    {/* <ScrollView> */}
                        <View style={[inner_container, row, row_list]}>
                            {this.state.photos.map((item) => {
                                return (
                                    <View style={row}>
                                        <View style={[photo_continer, centered_text]}>
                                            <Image resizeMode='cover' source={{ uri: item.uri }} style={photo_style}></Image>
                                        </View>
                                        <View style={[cross_container, centered_text]}>
                                            <TouchableOpacity onPress={() => this.onRemove(item)}>
                                                <Image resizeMode='cover' source={require('../../assets/cross.png')} style={cross_icon}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                            <TouchableOpacity onPress={this.onLaunchCamera}>
                                <View style={[photo_continer, centered_text]} >
                                    <Image resizeMode='cover' source={require('../../assets/add.png')} style={add_style}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                    {/* </ScrollView> */}

                </View>

                <View style={bottom_container}>
                    <Text></Text>
                    <View style={forward_container} >
                        <Image resizeMode='contain' source={require('../../assets/next_button_arrow.png')} style={arrow}></Image>
                    </View>
                </View>
            </View>
        )
    }
}