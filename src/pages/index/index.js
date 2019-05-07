import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      comment: {}
    }
  }

  config = {
    navigationBarTitleText: '今日乐评',
    enablePullDownRefresh: true,
    navigationBarTextStyle: 'white',
    backgroundTextStyle: 'light',
    backgroundColor: '#111d28',
    navigationBarBackgroundColor: '#111d28',
    // navigationBarBackgroundColor: '#4c4c4c'
  }

  onPullDownRefresh () {
    this.fetchComment()
    Taro.stopPullDownRefresh()
  }

  componentWillMount () {
    this.fetchComment()
  }

  componentDidMount () {
    Taro.stopPullDownRefresh()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  fetchComment = () => {
    Taro.cloud
      .callFunction({
        name: "comment",
        data: {}
      })
      .then(res => {
        // TODO handle exception
        console.log(res.result.images)
        this.setState({
          comment: res.result
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  render () {
    const comment = this.state.comment
    const bgStyle = {backgroundImage: 'url('+ comment.images + ')'}
    return (
      <View className='index'>
        <View className='bg' style={bgStyle} />
        <View className='main'>
          <View className='image-wrapper'>
            <Image className='song-image' src={comment.images} />
          </View>
          <View className='content'>{comment.comment_content}</View>
          <View className='info'>
            <View className='author'>—— {comment.comment_nickname}</View>
            {/*<View className='date'>{comment.comment_pub_date}</View>*/}
            {/*<View className='song-title'>在 {comment.title} 留下的评论</View>*/}
          </View>
        </View>
      </View>
    )
  }
}
