<template>
  <div class="footer">
    <div class="socials">
      <small>Created by Soft Code aka Chubbystrings</small>
    </div>
    <div class="designed">
      <v-icon
      small
      color="#fff"
    >
      mdi-twitter
    </v-icon>
    <v-icon
      small
      color="#fff"
    >
      mdi-linkedin
    </v-icon>
    <v-icon
      small
      color="#fff"
    >
      mdi-github
    </v-icon>
    <v-icon
      small
      color="#fff"
    >
      mdi-facebook
    </v-icon>
    </div>
  </div>
</template>

<script>

export default {

};
</script>

<style>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0px;
  margin: 0;
  padding: 0;
}

.socials {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #EDE9F2;
  width: 100%;
  height: 50px;
  font-size: 12px;
}

.designed {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #260D40;
  width: 100%;
   height: 100px;
   gap: 20px;
}
</style>
