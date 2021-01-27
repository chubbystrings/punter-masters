<template>
    <transition
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <v-container class="pb-1">
            <v-row id="comment" >
                <v-col cols="2" id="img---section">
                    <slot name="img"></slot>
                </v-col>
                <v-col cols="10" class="pa-0">
                    <slot></slot>
                </v-col>
            </v-row>
        </v-container>

    </transition>
</template>
<script>
export default {
  name: 'BaseCard',
};
</script>
<style scoped>
#comment {
  background-color:  #FCE4EC;
  border-radius: 40px;
  padding-right: 0.3rem;
}

#img---section {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
