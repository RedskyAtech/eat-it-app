import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import * as Service from '../../api/services';
import * as Url from '../../constants/urls';
import * as colors from '../../constants/colors';

export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisions: [],
      name: '',
      isVisibleLoading: false,
      dataExist: true,
      isLangar: false,
    };
  }
  componentDidMount = async () => {
    this.getCuisions();
  };

  onFilter = async () => {
    this.props.navigation.navigate('Filter');
  };

  getCuisions = async () => {
    this.setState({cuisions: [], isVisibleLoading: true});
    try {
      let response = Service.getDataApi(Url.GET_CUISIONS, '');
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              this.setState({dataExist: true});

              let tempCuisions = [];
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].image) {
                  image = res.data[i].image.url;
                }
                tempCuisions.push({
                  id: res.data[i]._id,
                  name:
                    res.data[i].name.slice(0, 1).toUpperCase() +
                    res.data[i].name.slice(1, res.data[i].name.length),
                  image: image,
                });
              }
              this.setState({
                cuisions: tempCuisions,
                isLangar: true,
                isVisibleLoading: false,
              });
            } else {
              this.setState({isVisibleLoading: false, dataExist: false});
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found:', res.error);
            // alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('try-catch error:', error.error);
          alert('Something went wrong');
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert('Something went wrong');
    }
  };
  onNameChange(name) {
    if (name == '') {
      this.setState({cuisions: [], name: ''});
      this.getCuisions();
    } else {
      this.setState({name});
      this.setState({
        isLangar: false,
        query: `name=${this.state.name}&searchType=cuisine`,
      });
      this.getFood();
    }
  }
  getCuisionFood = async (cuisineId, name) => {
    console.log('cuisionId::', cuisineId);
    await this.props.navigation.navigate('SearchName', {
      cuisineId: cuisineId,
      cuisineName: name,
      from: 'search',
    });
  };
  getLangarFood = async type => {
    await this.props.navigation.navigate('SearchName', {from: 'langar'});
  };
  getFood = async () => {
    await this.setState({cuisions: [], isVisibleLoading: true});
    try {
      let response = Service.getDataApi(
        Url.SEARCH_FOOD + `?${this.state.query}`,
        '',
      );
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              this.setState({dataExist: true});
              let tempProducts = [];
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].image) {
                  image = res.data[i].image.url;
                }
                tempProducts.push({
                  id: res.data[i]._id,
                  name:
                    res.data[i].name.slice(0, 1).toUpperCase() +
                    res.data[i].name.slice(1, res.data[i].name.length),
                  image: image,
                });
              }
              this.setState({cuisions: tempProducts, isVisibleLoading: false});
            } else {
              this.setState({isVisibleLoading: false, dataExist: false});
              console.log('dexist', this.state.dataExist, res.data);
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('no data found:', res);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('try-catch error:', error.error);
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
      column,
      search_container,
      accordian_style,
      top_container,
      row,
      between_spacing,
      around_spacing,
      search_input,
      icons,
      search_icon,
      inner_container,
      row_list,
      photo_continer,
      centered_text,
      photo_style,
      cuision_text,
      list_height,
      loader
    } = styles;
    return (
      <View style={[container, column, between_spacing]}>
        <View>
          <View style={[row, around_spacing, top_container]}>
            <View style={[search_container, row, around_spacing]}>
              <Image
                resizeMode="contain"
                source={require('../../assets/search.png')}
                style={search_icon}
              />
              <TextInput
                placeholder="Search cuisines"
                style={search_input}
                onChangeText={name => this.onNameChange(name)}
                value={this.state.name}
              />
            </View>
          </View>
          {this.state.dataExist ? (
            <View style={list_height}>
              <ScrollView>
                <View style={[inner_container, row, row_list]}>
                  {this.state.isLangar ? (
                    <View>
                      <View style={row}>
                        <TouchableOpacity
                          onPress={() => this.getLangarFood('langar')}>
                          <View style={[photo_continer]}>
                            <Image
                              resizeMode="cover"
                              source={require('../../assets/burger.jpg')}
                              style={photo_style}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Text style={cuision_text}>Langar</Text>
                    </View>
                  ) : (
                    <View />
                  )}
                  {this.state.cuisions.map(item => {
                    return (
                      <View>
                        <View style={row}>
                          <TouchableOpacity
                            onPress={() =>
                              this.getCuisionFood(item.id, item.name)
                            }>
                            <View style={[photo_continer]}>
                              <Image
                                resizeMode="cover"
                                source={{uri: item.image}}
                                style={photo_style}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <Text style={cuision_text}>{item.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={[list_height, column, centered_text]}>
              <Text style={{textAlign: 'center'}}>No food found</Text>
            </View>
          )}

          <View style={loader}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color={colors.primaryColor}
            />
          </View>
        </View>
      </View>
    );
  }
}

