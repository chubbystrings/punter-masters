<template>
  <v-carousel
    cycle
    height="120"
    hide-delimiter-background
    show-arrows-on-hover
    class=""
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      src="../../assets/umbrella.jpg"
      class=""
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="primary--text display-1 pl-3">{{ slide.name }}</div>
          <v-btn
          class="ml-3 text-color hidden-sm-and-down"
          small
          color="primary"
          @click="doAction(slide.type, slide.link)"
           v-if="slide.link">
           {{slide.message}}
           </v-btn>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        {
          name: 'SHARE CODE', link: 'TOGGLE_SHARE_DIALOG', type: 'commit', message: 'Share Code',
        },
        {
          name: 'LOVE BANTER?', link: 'Banter', type: 'link', message: 'Banter Room',
        },
        { name: 'TALK TO OTHER MASTERS' },
        { name: 'MORE FORUMS' },
        { name: 'WIN BIG' },
      ],
    };
  },

  methods: {
    doAction(action, link) {
      if (action === 'link') {
        this.$router.push({ name: link });
      }
      if (action === 'commit') {
        this.$store.commit(link);
      }
    },
  },
};
</script>
