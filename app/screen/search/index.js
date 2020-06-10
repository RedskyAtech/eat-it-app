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

export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisions: [],
      name: '',
      isVisibleLoading: false,
    };
  }
  componentDidMount = async () => {
    this.getCuisions();
  };

  onFilter = async () => {
    this.props.navigation.navigate('Filter');
  };

  getCuisions = async () => {
    this.setState({cuisions: [],isVisibleLoading:true});
    try {
      let response = Service.getDataApi(Url.GET_CUISIONS, '');
      response
        .then(res => {
          if (res.data) {
            if (res.data.length != 0) {
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
                isVisibleLoading:false
              });
            }
          } else {
            this.setState({isVisibleLoading:false})
            console.log('if no data in response:', res.error);
            alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading:false})
          console.log('api problem:', error.error);
          alert(error.error);
        });
    } catch (err) {
      this.setState({isVisibleLoading:false})
      console.log('another problem:', err);
      alert(err);
    }
  };
  onNameChange(name) {
    if (name == '') {
      this.setState({cuisions: [], name:''});
      this.getCuisions();
    } else {
      this.setState({name});
      this.setState({query: `name=${this.state.name}&searchType=cuisine`});
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
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('if no data in response:', res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('api problem:', error.error);
          alert(error.error);
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert(err);
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
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../../assets/filter_yellow.png')}
                style={icons}
              />
            </TouchableOpacity>
          </View>

          <View style={list_height}>
            <ScrollView>
              <View style={[inner_container, row, row_list]}>
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
          <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
            <ActivityIndicator
              animating={this.state.isVisibleLoading}
              size="large"
              color="#0000ff"
            />
          </View>
          {/* <Accordion
            style={accordian_style}
            dataArray={this.state.dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          /> */}
        </View>
      </View>
    );
  }
}

// _renderHeader(item, expanded) {
//   return (
//     <View
//       style={[
//         styles.row,
//         styles.between_spacing,
//         styles.inner_container,
//         styles.list_spacing,
//       ]}>
//       <Text style={expanded ? styles.colored_list_title : styles.list_title}>
//         {' '}
//         {item.title}
//       </Text>
//       {expanded ? (
//         <Icon style={styles.down_icon} name="chevron-down" />
//       ) : (
//         <Icon style={styles.right_icon} name="chevron-right" />
//       )}
//     </View>
//   );
// }
// _renderContent(item) {
//   return (
//     <>
//       <View style={styles.horizontal_line} />
//       {item.content.map(value => {
//         return (
//           <View
//             style={[
//               styles.row,
//               styles.inner_container,
//               styles.inner_list_spacing,
//             ]}>
//             <Text style={styles.inner_text}> {value.item}</Text>
//           </View>
//         );
//       })}
//       <View style={styles.horizontal_line} />
//     </>
//   );
// }
