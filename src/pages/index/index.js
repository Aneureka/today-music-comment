import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      comment: {
        song_id: 0,
        title: '',
        images: '',
        author: '',
        album: '',
        description: '',
        mp3_url: '',
        pub_date: '',
        comment_id: 0,
        comment_user_id: 0,
        comment_nickname: '',
        comment_avatar_url: '',
        commnet_liked_count: 0,
        comment_content: '',
        comment_pub_date: ''
      },
      nextComment: {},
    }
  }

  config = {
    navigationBarTitleText: '今日乐评',
    enablePullDownRefresh: true,
    navigationBarTextStyle: 'white',
    backgroundTextStyle: 'light',
    backgroundColor: '#111d28',
    navigationBarBackgroundColor: '#111d28',
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

  handleSongImageLoad () {
    this.setState({
      comment: this.state.nextComment
    })
  }

  fetchComment = () => {
    Taro.cloud
      .callFunction({
        name: "comment",
        data: {}
      })
      .then(res => {
        // TODO handle exception
        this.setState({
          nextComment: res.result
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  render () {
    const comment = this.state.comment
    return (
      <View className='index' >
        <View className='bg' style={{background: 'url('+ comment.images + ')'}} />
        <View className='main'>
          <View className='image-wrapper'>
            <Image className='song-image' src={comment.images} />
            <Image className='preload-image' src={this.state.nextComment.images} onLoad={this.handleSongImageLoad.bind(this)} />
          </View>
          <View className='content'>{comment.comment_content}</View>
          <View className='info'>
            <View className='author'>@{comment.comment_nickname}</View>
            <View className='song-title'>{'📻 ' + comment.title}</View>
          </View>
        </View>
      </View>
    )
  }
}
