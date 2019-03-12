import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getNews } from './src/news';
import Article from './src/components/Articles';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { articles: [], refreshing: true};
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount(){
    this.fetchNews();
  }

  fetchNews(){
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }) )
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh(){
    this.setState({ refreshing: false }, () => {
      this.fetchNews()
    });
  }



  render() {
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      // </View>
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
