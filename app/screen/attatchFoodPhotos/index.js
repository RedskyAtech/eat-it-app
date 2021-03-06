import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-picker';
import ShareFood from '../shareFood';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import {NavigationActions, StackActions} from 'react-navigation';
import * as colors from '../../constants/colors';

export default class attatchFoodPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isDialogVisible: false,
      files: [],
      isVisibleLoading: false,
      images: [],
    };
  }
  componentDidMount = async () => {
    let isSkipped = await utility.getItem('isSkipped');
    console.log('skipped', isSkipped);

    if (isSkipped == true) {
      await this.setState({isDialogVisible: false});
      await utility.showAlert('Please login first.', this.onLogin);
      await this.props.navigation.navigate('tab1');
      return;
    } else {
      await this.setState({isDialogVisible: true});
      await this.showDialog();
    }
  };
  onLogin = async () => {
    await this.props.navigation.navigate('Login');
  };
  showDialog = async () => {
    await this.setState({isDialogVisible: true});
  };
  closeDialog = async () => {
    await this.setState({isDialogVisible: false});
  };
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }
  onLaunchCamera = () => {
    if (this.state.photos && this.state.photos.length < 5) {
      let options = {
        cameraType: 'front',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = {uri: response.uri};
          var joined = this.state.photos.concat({
            uri: response.uri,
            fileName: response.fileName,
            type: response.type,
          });
          this.setState({photos: joined});
          // this.onUploadImage(response);
        }
      });
    } else {
      alert('Unable to add more images');
    }
  };

  onRemove = async item => {
    let index = this.state.photos.indexOf(item);
    this.state.photos.splice(index, 1);
    let joined = this.state.photos;
    await this.setState({photos: joined});
  };
  onBack = async () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'BottomTab'})],
      }),
    );
    await this.props.navigation.navigate('tab1');
  };
  onNext = async () => {
    if (this.state.photos && this.state.photos != 0) {
      await this.props.navigation.navigate('AddFood', {
        photos: this.state.photos,
      });
    } else {
      alert('Select images first');
    }
  };
  onUploadImage = async file => {
    await this.setState({isVisibleLoading: true});

    var formData = new FormData();
    let fileData = {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    };
    formData.append('file', fileData);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
    try {
      let response = Service.uploadImageApi(
        Url.UPLOAD_IMAGE,
        formData,
        headers,
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data != null) {
              if (res.data.image != null) {
                var joined = this.state.images.concat({
                  url: res.data.image.url,
                  resize_url: res.data.image.resize_url,
                });
                this.setState({images: joined});
              }
              if (this.state.images.length == this.state.photos.length) {
                this.props.navigation.navigate('AddFood', {
                  images: this.state.images,
                });
                this.setState({
                  photos: [],
                  images: [],
                  isVisibleLoading: false,
                });
              }
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('error in try-catch', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  render() {
    const {
      container,
      inner_container,
      bottom_container,
      photo_continer,
      spacing,
      centered_text,
      cross_container,
      cross_icon,
      row_list,
      photo_style,
      forward_container,
      row,
      arrow,
      column,
      heading_text,
      between_spacing,
      add_style,
      loader,
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          {this.state.isDialogVisible ? (
            <ShareFood
              visible={this.state.isDialogVisible}
              closeDialog={this.closeDialog}
              navigation={this.props.navigation}
            />
          ) : (
            <View />
          )}
          <View style={[inner_container, row, between_spacing, spacing]}>
            <TouchableOpacity onPress={this.onBack}>
              <Image
                resizeMode="contain"
                source={require('../../assets/back_arrow.png')}
                style={arrow}
              />
            </TouchableOpacity>
            <Text style={heading_text}>Attach photos</Text>
            <View>
              <Text> </Text>
            </View>
          </View>

          <View style={[inner_container, row, row_list]}>
            {this.state.photos.map(item => {
              return (
                <View style={row}>
                  <View style={[photo_continer, centered_text]}>
                    <Image
                      resizeMode="cover"
                      source={{uri: item.uri}}
                      style={photo_style}
                    />
                  </View>
                  <View style={[cross_container, centered_text]}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.onRemove(item)}>
                      <Image
                        resizeMode="cover"
                        source={require('../../assets/cross.png')}
                        style={cross_icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity onPress={this.onLaunchCamera}>
              <View style={[photo_continer, centered_text]}>
                <Image
                  resizeMode="cover"
                  source={require('../../assets/add.png')}
                  style={add_style}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={bottom_container}>
          <Text />
          <TouchableOpacity activeOpacity={1} onPress={this.onNext}>
            <View style={forward_container}>
              <Image
                resizeMode="contain"
                source={require('../../assets/next_button_arrow.png')}
                style={arrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={loader}>
          <ActivityIndicator
            animating={this.state.isVisibleLoading}
            size="large"
            color={colors.primaryColor}
          />
        </View>
      </View>
    );
  }
}
