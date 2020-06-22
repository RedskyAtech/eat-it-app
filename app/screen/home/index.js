import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {Badge} from 'react-native-elements';
import HandleBack from '../../components/HandleBack';
import * as Service from '../../api/services';
import * as utility from '../../utility/index';
import * as Url from '../../constants/urls';
import * as colors from '../../constants/colors';

const ViewTypes = {
  HALF_LEFT: 1,
  HALF_BETWEEN: 2,
  HALF_RIGHT: 3,
};

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
    this.state = {};
  }
  showDetail = async () => {
    this.props.navigation.navigate('FoodDetails', {
      foodId: this.props.data.id,
      from: 'home',
    });
  };
  render() {
    const {
      heading_text,
      row,
      heading_container,
      column,
      between_spacing,
      colored_text,
      grey_text,
      image,
      yellow_color,
      free_text,
    } = styles;
    return (
      <>
        <View {...this.props}>
          <TouchableOpacity onPress={this.showDetail}>
            <Image
              resizeMode="stretch"
              source={{uri: this.props.data.image}}
              style={image}
            />
          </TouchableOpacity>
        </View>
        <View style={[heading_container, column]}>
          <Text style={heading_text} numberOfLines={1}>
            {this.props.data.name}
          </Text>
          <View style={[row, between_spacing]}>
            {this.props.data.type == 'langar' ? (
              <Text style={yellow_color}>Langar</Text>
            ) : this.props.data.price == 0 ? (
              <Text style={free_text}>Free</Text>
            ) : (
              <Text style={colored_text}>Rs {this.props.data.price}</Text>
            )}
            <Text style={grey_text}>{this.props.data.time}</Text>
          </View>
          <Text style={grey_text} numberOfLines={1}>
            {this.props.data.address}
          </Text>
        </View>
      </>
    );
  }
}

export default class home extends Component {
  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');

    this.dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 2 === 1) {
          return ViewTypes.HALF_LEFT;
        } else if (index % 2 === 2) {
          return ViewTypes.HALF_BETWEEN;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 3.02;
            dim.height = 170;
            break;
          case ViewTypes.HALF_BETWEEN:
            dim.width = width / 3.02;
            dim.height = 170;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 3.02;
            dim.height = 170;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    this.products = [];
    this.getFood();

    this.state = {
      query: '',
      filtersList: [
        {
          name: 'For you',
        },
        {
          name: 'Free',
        },
        {
          name: 'Last search',
        },
        {
          name: 'Near you',
        },
        {
          name: 'Follow',
        },
      ],
      selectedIndex: 0,
      name: '',
      isVisibleLoading: false,
      noDataExist: false,
      dataProvider: this.dataProvider.cloneWithRows(
        this._generateArray(this.products),
      ),
    };
  }
  onListItem = async index => {
    if (index == 0) {
      await this.setState({query: ''});
      await this.getFood();
    }
    if (index == 1) {
      await this.setState({query: 'isFoodFree=true&&searchType=food'});
      await this.getFood();
    }
    await this.setState({selectedIndex: index});
  };

  getFood = async () => {
    this.products = [];
    await this.setState({isVisibleLoading: true});

    try {
      let url;
      if (
        this.state.query == '' ||
        this.state.query == null ||
        this.state.query == undefined
      ) {
        url = Url.GET_FOODS;
      } else {
        url = Url.SEARCH_FOOD + `?${this.state.query}`;
      }
      let response = Service.getDataApi(url, '');
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
              this.setState({noDataExist: false});
              for (let i = 0; i < res.data.length; i++) {
                let image;
                if (res.data[i].images) {
                  image = res.data[i].images[0].resize_url;
                }
                this.products.push({
                  id: res.data[i]._id,
                  type: res.data[i].type,
                  name: res.data[i].name,
                  price: res.data[i].price,
                  time: res.data[i].cookingTime,
                  address: res.data[i].address,
                  image: image,
                });
              }
              this.setState({
                dataProvider: this.dataProvider.cloneWithRows(
                  this._generateArray(this.products),
                ),
                isVisibleLoading: false,
              });
            } else {
              this.setState({noDataExist: true, isVisibleLoading: false});
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('if no data in response:', res.error);
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

  _generateArray(array) {
    let n = array.length;
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = array[i];
    }
    return arr;
  }

  _rowRenderer(type, data) {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <CellContainer
            style={styles.containerGridLeft}
            data={data}
            navigation={this.props.navigation}
          />
        );
      case ViewTypes.HALF_BETWEEN:
        return (
          <CellContainer
            style={styles.containerGridLeft}
            data={data}
            navigation={this.props.navigation}
          />
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <CellContainer
            style={styles.containerGridLeft}
            data={data}
            navigation={this.props.navigation}
          />
        );
      default:
        return null;
    }
  }

  onBack = async () => {
    const rembemberMe = await utility.getItem('rembemberMe');
    console.log('meeeeeeeeeeeeeeeee:', rembemberMe);
    if (rembemberMe == false) {
      await utility.removeAuthKey('token');
      await utility.removeAuthKey('userId');
    }
    BackHandler.exitApp();
    return true;
  };
  onSearch = async () => {
    this.props.navigation.navigate('SearchName', {
      name: this.state.name,
      from: 'home',
    });
    await this.setState({name: ''});
  };
  closeDialog = async () => {
    this.setState({isVisible: false});
  };
  onNotification = async () => {
    await this.props.navigation.navigate('Notifications', {from: 'home'});
  };
  render() {
    const {
      container,
      container_width,
      top_container,
      row,
      list_container,
      icons,
      center_align,
      badge_style,
      selected_color,
      badge_text_style,
      filter_text,
      filter_container,
      unselected_color,
      filters,
      column,
      between_spacing,
      around_spacing,
      search_icon,
      search_input,
      search_container,
      centered_text,
      loader,
      loader_color,
    } = styles;
    return (
      <HandleBack onBack={this.onBack}>
        <View style={[container, column, between_spacing]}>
          <View style={top_container}>
            <View>
              <View style={[row, between_spacing, container_width]}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/location.png')}
                  style={icons}
                />
                <TouchableOpacity onPress={this.onSearch}>
                  <View style={[search_container, row, around_spacing]}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/search.png')}
                      style={search_icon}
                    />
                    <TextInput
                      placeholder="Search food"
                      style={search_input}
                      onChangeText={name => this.setState({name})}
                      value={this.state.name}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onNotification}>
                  <View style={[row, center_align]}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/notification_solid_yellow.png')}
                      style={icons}
                    />
                    <Badge
                      value="1"
                      status="success"
                      badgeStyle={badge_style}
                      textStyle={badge_text_style}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[row, filter_container]}>
                {this.state.filtersList.map(item => {
                  let index = this.state.filtersList.indexOf(item);
                  return (
                    <TouchableOpacity onPress={() => this.onListItem(index)}>
                      <View
                        style={
                          this.state.selectedIndex == index
                            ? [filters, selected_color]
                            : [filters, unselected_color]
                        }>
                        <Text style={filter_text}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          {!this.state.noDataExist ? (
            <View style={list_container}>
              <RecyclerListView
                layoutProvider={this._layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={this._rowRenderer}
              />
            </View>
          ) : (
            <View style={[list_container, column, centered_text]}>
              <Text style={{textAlign: 'center'}}>
                No food found for today, add food for share
              </Text>
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
      </HandleBack>
    );
  }
}
