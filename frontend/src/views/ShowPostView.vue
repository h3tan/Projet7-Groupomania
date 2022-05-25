<template>
<div class="post_page">
    <router-link to="/whatsnew">Back</router-link>
    <PostCard />
</div>
</template>

<script>
import PostCard from '../components/PostCard.vue'

export default {
    name: "ShowPostView",
    components: {
        PostCard
    }
}
</script>

<style scoped>

</style>
