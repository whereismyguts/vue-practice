// Vue.component('blog-post', {
//     model: {
//         event: 'change',
//         prop: 'checked'
//     },
//     props: ['title', 'body', 'checked'],
//     template: `
//     <div class='tile'
//         v-on:click="$emit('change', $event.target.checked)">
//         <h1> {{ checked }} </h1> 
//         <h1> {{ title }} </h1> 
//         <p> {{ body }}</p>  
//     </div>`
//   })

  Vue.component('note-tile', {
    props: ['post', 'focused'],
    template: `
        <div v-bind:class="{'note-tile':true, 'note-tile-focus':focused}" 
            @click="handleClick()">
            <p > {{ post.title }} </p> 
            <div v-if="focused" v-bind:class="{'focus':focused}">
                <input
                    v-if="focused"
                    v-bind:value="post.title"
                >
                <textarea v-if="focused"
                    v-bind:value="post.body"
                ></textarea>  
            </div>
        </div>`,
    // data: function () {
    //     return {
    //         focused: false
    //     }
    // },        
    methods: {
        handleClick(where) {

            this.focused = true
            if (this.focused)
                this.$emit('click', this.post.id);

      }
    }
  })
  
  
  new Vue({
    el: '#notes-demo',
    data: {
      posts: [],
      showMessage: true,
      focusedPost: -1
    },
    methods: {
        setFocused (key) {
            this.focusedPost = key
        },
        isFocused(post_id){
            return post_id == this.focusedPost
        }
    },
    created: function () {
      // Alias the component instance as `vm`, so that we  
      // can access it inside the promise function
      var vm = this
      // Fetch our array of posts from an API
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
            vm.posts = data
        })
        
    }
  })