<template>
  <div class="">
    <base-dialog @yes="yes" @no="no" />
    <base-back  v-if="userProfile" />
    <base-reset />
      <v-card
        style=""
        class="mx-auto pa-3"
        color="transparent"
        outlined
        flat
      >
      <div class="text-center">
        <h3 class="primary--text text-center">Welcome to Rollover Games</h3>
        <small class="text-center primary--text">
          Select your options and start game
        </small>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card
            key="firstCard"
              style="width: 100%;"
              class="mx-auto"
              color="transparent"
              flat
              >
            <v-container fluid>
              <v-row align="center">
                <v-col class="d-flex pa-0 pl-2" cols="12">
                  <v-row>
                    <v-col cols="9">
                      <small>{{ valueDeterminate }}%</small>
                      <v-progress-linear
                        v-model="valueDeterminate"
                        color="primary"
                      ></v-progress-linear>
                    </v-col>
                    <v-col cols="3">
                      <div
                        style="position: absolute; right: 1rem;"
                        >
                        <v-menu open-on-hover bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                              v-bind="attrs"
                              v-on="on"
                            >
                            <v-badge
                              bordered
                              color="primary"
                              :content="added.length > 0 ? numberAdded : '0' "
                              offset-x="10"
                              offset-y="10"
                            >
                            <v-avatar
                              size="32"
                              >
                                <v-img :src="userProfile.photoURL"></v-img>
                            </v-avatar>
                        </v-badge>
                        </v-btn>
                        </template>
                          <v-list v-if="added.length === 0">
                            <v-list-item
                            >
                              <v-list-item-title>
                              No started yet
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                            <v-list v-else>
                            <v-list-item
                              v-for="(item, index) in added"
                              :key="index"
                            >
                              <v-list-item-title>
                                {{ 'Game ' + Number(index + 1) }}
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    v-model="selectedGoal"
                    :items="goal"
                    label="Set Goal"
                    dense
                    @change="changeGoal"
                    :disabled="started"
                    filled
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="selectedOdds"
                    :items="odds"
                    label="Choose odds"
                    dense
                    @change="changeOdds"
                    :disabled="started || !selectedGoal"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="selectedStake"
                    :items="stake"
                    label="Choose Initial Stake"
                    dense
                    :disabled="started || !selectedOdds"
                    @change="changeStake"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    v-model="selectedDays"
                    label="days"
                    :items="daysNumber"
                    :disabled="started || !selectedStake"
                    dense
                    readonly
                  ></v-select>
                </v-col>
                 <v-col class="d-flex" cols="12" sm="12">
                   <transition mode="out-in"
                    enter-active-class="animated fadeInRightBig"
                    leave-active-class="animated fadeOut"
                    >
                  <small v-if="selectedDays && !started" class="primary--text">
                    {{
                      `This game wining total is approx. ${winingMoney} spread over ${selectedDays}
                      ${checkGoodGame}
                      `
                    }}
                  </small>
                   </transition>
                </v-col>
            </v-row>
          </v-container>
          <div style=" position: relative; bottom: 0.1rem;">
                  <v-btn
                  :disabled="checkFields || started"
                    small
                    class="mt-1 mb-1 mr-1"
                    color="primary"
                    @click="confirmStart"
                  >Start
                  </v-btn>
                  <v-btn
                    color="primary"
                    class="mt-1 mb-1 mr-1"
                    small
                    @click="reset"
                    :disabled="started || checkFields"
                    >
                    Reset
                  </v-btn>
                  <v-btn
                    color="primary"
                    class="mt-1 mb-1 mr-1"
                    small
                    @click="confirmNewGame"
                    :disabled="!gameWon"
                    >
                    New Game
                  </v-btn>
                  <v-btn
                    color="primary"
                    class="mt-1 mb-1 mr-1"
                    small
                    @click="confirmCancelGame"
                    :disabled="!started || gameWon"
                    >
                    Cancel Game
                  </v-btn>
                </div>
          </v-card>
          </v-col>
            <v-col cols="12">
              <v-card
              key="secondCard"
              style="width: 100%;"
              class="mx-auto"
              color="transparent"
              flat
              >
              <v-simple-table fixed-header dense dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Day</th>
                      <th class="text-left">Stake</th>
                      <th class="text-left">Odd</th>
                      <th class="text-left">Win</th>
                      <th class="text-left">Save</th>
                      <th class="text-left">Action</th>
                      <th class="text-left">Game</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in added"
                     :key="index"
                     >
                      <td :key="item.selection_id">{{ item.selection_id }}</td>
                      <td :key="index + 1">{{ index + 1 }}</td>
                      <td :key="index + 2">{{ index === 0
                         || item.gameStatus === 'current'
                         || item.gameStatus === 'won'
                          ? Number(item.stake) : 'Not set' }}
                      </td>
                      <td :key="index + 7">{{Number(selectedOdds)}}</td>
                      <td :key="index + 6">{{Number(item.stake) * Number(selectedOdds)}}</td>
                      <td :key="index + 3">
                        {{ item.gameStatus === 'current'
                          && index > 0 || item.gameStatus === 'won'
                          || amount.indexOf(item.stake) + 1 > added.length - 1
                          ?
                          save[amount.indexOf(item.stake)]
                           : '0'
                        }}
                      </td>
                      <td :key="index + 4">
                        <v-btn
                          color="primary"
                          :disabled="item.gameStatus === 'waiting'
                          || item.gameStatus === 'won'
                          || !started"
                          @click="confirm(index)"
                          >
                          {{ item.gameStatus === 'won' || item.gameStatus === 'lost'
                            ? 'Confirmed' : 'Confirm'
                          }}
                        </v-btn>
                      </td>
                      <td :key="index + 5" :ref="'data-'+index">
                        {{ item.gameStatus }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
                <v-container fluid>
                  <v-row align="center">
                    <v-col class="d-flex pa-0 pl-2" cols="12">
                  </v-col>
                </v-row>
              </v-container>
              </v-card>
            </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  gamesCollection, usersCollection, selectionsCollection, auth,
} from '../firebase';

export default {
  data: () => ({
    save: [],
    savedTotal: 0,
    nextAmount: 0,
    goalAmount: 0,
    daysNumber: [],
    selectedDays: '',
    getNumberOfDays: '',
    numberOfDays: 0,
    seletionCurrentDay: 0,
    selectedStake: '',
    stakeReadOnly: false,
    daysReadOnly: false,
    saver: 1000,
    stake: [
      '2000',
      '3000',
      '5000',
      '9000',
    ],
    selectedGoal: '',
    goal: [
      '100,000 to 499,999',
      '500,000 to 899,999',
      '900,000 to 1,000,000',
      '1,000,001 to 2,000,000',
    ],
    selectedOdds: '',
    odds: [],
    totalMoney: 0,
    winingMoney: null,
    numberAdded: 0,
    added: [],
    valueDeterminate: 0,
    indexForTable: [1],
    nextOnTable: 0,
    wonMatch: [],
    started: false,
    gameWon: false,
    amount: [],
    winnings: [],
  }),
  computed: {
    ...mapState(['userProfile', 'actionDialog']),
    // validation for input fields
    checkFields() {
      return !this.selectedOdds || !this.selectedGoal || !this.selectedStake || !this.selectedDays;
    },

    // conifrm if game wins
    checkGameWon() {
      return this.gameWon;
    },

    // check if stake and odds will return amount within specified goal set
    checkGoodGame() {
      const value = this.selectedGoal.split(' to ')[0];
      const newArr = value.split(',');
      const rangeValue = newArr.join('');
      if (this.totalMoney < Number(rangeValue)) {
        return `, However ${this.winingMoney} is lesser than your set goal. To get a better total, try using lesser odds or a better combination of Initial stake and odd`;
      }
      return '';
    },

  },

  methods: {

    async loadGameData() {
      this.$store.commit('OVERLAY_ON', 'Loading..');
      const userId = auth.currentUser.uid;
      const userDoc = await usersCollection.doc(userId).get();
      if (userDoc.data().rollover) {
        try {
          this.started = true;
          const { gameId } = userDoc.data();
          const gameDoc = await gamesCollection.doc(gameId).get();
          this.amount = gameDoc.data().amount;
          this.save = gameDoc.data().save;
          this.selectedOdds = gameDoc.data().odd;
          const days = gameDoc.data().spread.split(' ')[0];
          this.getNumberOfDays = days;
          this.gameWon = !!gameDoc.data().gameWon;
          const snapShot = await selectionsCollection.where('userId', '==', userId).where('gameId', '==', gameId).orderBy('selectionDay', 'asc').get();
          snapShot.forEach((selection) => {
            this.added.push({
              selection_id: selection.id,
              gameStatus: selection.data().SelectionStatus,
              stake: selection.data().stake,
              day: selection.data().selectionDay,
            });
          });
          const nextAmountIndex = this.added.length - 1;
          this.nextAmount = Number(this.amount[nextAmountIndex]);
          this.countGameAdded();
          this.$store.commit('OVERLAY_OFF');
        } catch (error) {
          this.$store.commit('OVERLAY_OFF');
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: error.message,
          });
        }
      }
      this.$store.commit('OVERLAY_OFF');
    },

    async getGameId() {
      const userId = await auth.currentUser.uid;
      const user = await usersCollection.doc(userId).get();
      return user.data().gameId;
    },
    confirmStart() {
      const message = 'Are you sure you are ready to start this game';
      this.openDialog('Start', message);
    },

    confirmCancelGame() {
      const message = 'Are you sure you want to cancel this game?';
      this.openDialog('Cancel Game', message);
    },

    confirmNewGame() {
      const message = 'Start a new Game?';
      this.openDialog('New Game', message);
    },
    // reload game when for input change
    reloadGame() {
      if (this.selectedGoal && this.selectedOdds && this.selectedStake && this.selectedDays) {
        this.checkGoal();
      }
    },

    alert({ type, message }) {
      this.$store.commit('SET_ALERT', {
        type,
        message,
      });
    },

    // Function to run and to load odds when goal input changes
    changeGoal() {
      this.checkOdds();
      this.reloadGame();
    },
    // Function to run when odds change
    changeOdds() {
      this.reloadGame();
    },
    // function to run when initial stake chnage
    changeStake() {
      this.checkGoal();
    },

    sortSaveValues() {
      this.save.pop();
      this.savedTotal = this.save.reduce((a, b) => a + b);
      this.save.push(this.savedTotal);
    },

    // Convert set goal to numbers
    convertGoal() {
      let goal = 0;
      switch (this.selectedGoal) {
        case '100,000 to 499,999':
          goal = 499999;
          break;
        case '500,000 to 899,999':
          goal = 899999;
          break;
        case '900,000 to 1,000,000':
          goal = 1000000;
          break;
        case '1,000,001 to 2,000,000':
          goal = 2000000;
          break;
        default:
          goal = 499999;
      }
      return goal;
    },

    // Programatically create stake/save values from initial stake
    createStakeValues() {
      if (this.amount.length > 0) {
        this.amount = [];
      }
      if (this.save.length > 0) {
        this.save = [];
      }
      const goal = this.convertGoal();
      // eslint-disable-next-line max-len
      for (let i = Number(this.selectedStake); i <= goal; i = (i * Number(this.selectedOdds)) - this.checkSaver(i)) {
        if (i * Number(this.selectedOdds) < goal) {
          this.amount.push(i);
          this.save.push(this.checkSaver(i));
        }
      }
      this.sortSaveValues();
      this.convertToCurrency();
    },

    // convert winning to currency format
    convertToCurrency() {
      const won = this.amount[this.amount.length - 1] * this.selectedOdds;
      this.totalMoney = Number(won + this.savedTotal);
      this.winingMoney = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(this.totalMoney);
    },

    // conditionally create odds
    checkOdds() {
      this.odds = [];
      this.selectedOdds = '';
      if (this.convertGoal() < 500000) {
        this.odds.push(2);
      } else if (this.convertGoal() > 500000 && this.convertGoal() < 900000) {
        this.odds.push(2, 3);
      } else {
        this.odds.push(2, 3, 4, 5);
      }
    },

    // function to check predict and load game number of days
    checkGoal() {
      this.createStakeValues();
      if (this.numberOfDays > 0) {
        this.numberOfDays = 0;
      }
      this.numberOfDays = this.amount.length;

      if (this.daysNumber.length > 0) {
        this.daysNumber = [];
        this.daysNumber.push(`${this.numberOfDays} days`);
        const [days] = this.daysNumber;
        this.selectedDays = days;
      } else {
        this.daysNumber.push(`${this.numberOfDays} days`);
        const [days] = this.daysNumber;
        this.selectedDays = days;
      }
    },

    // check stake amount
    checkStake(amount) {
      if (this.selectedGoal === 'less than 500,000') {
        return amount >= 499999;
      }
      if (this.selectedGoal === '500,000 to 899,999') {
        return amount >= 899999;
      }
      if (this.selectedGoal === '900,000 to 1,000,000') {
        return amount >= 1000000;
      }
      if (this.selectedGoal === '1,000,001 to 2,000,000') {
        return amount >= 2000000;
      }
      return false;
    },

    // stake value and return how much to save
    checkSaver(amount) {
      let newAmount = amount;
      if (newAmount === Number(this.selectedStake)) {
        newAmount *= this.selectedOdds;
      }
      if (Number(newAmount) <= 10000) {
        return 1000;
      }
      if (Number(newAmount) > 10000 && Number(newAmount) <= 18000) {
        return 3000;
      }

      if (Number(newAmount) > 18000 && Number(newAmount) <= 60000) {
        return 5000;
      }

      if (Number(newAmount) > 60000 && Number(newAmount) <= 150000) {
        return 15000;
      }
      return 20000;
    },

    // function to add new game to table
    addGame() {
      const now = new Date();
      this.seletionCurrentDay += 1;
      const id = `${this.userProfile.userId}-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getTime()}`;
      const stake = Number(this.nextAmount);
      const addnewGame = {
        selection_id: id,
        gameStatus: 'current',
        stake,
        day: this.seletionCurrentDay,
      };

      this.added.push(addnewGame);
      this.countGameAdded();
      this.saveGameToDb(addnewGame);
    },

    async saveGameToDb(payload) {
      const user = await usersCollection.doc(this.userProfile.userId).get();
      const data = {
        gameId: user.data().gameId ? user.data().gameId : '',
        SelectionStatus: payload.gameStatus,
        stake: payload.stake,
        selectionDay: payload.day,
        userId: this.userProfile.userId,
      };
      if (user.data().rollover) {
        const { gameId } = user.data();
        await gamesCollection.doc(gameId).get();
        await selectionsCollection.doc(payload.selection_id).set(data);
      } else {
        try {
          const games = await gamesCollection.add({
            userId: this.userProfile.userId,
            odd: Number(this.selectedOdds),
            goal: this.selectedGoal,
            amount: this.amount,
            spread: this.selectedDays,
            initialStake: this.selectedStake,
            save: this.save,
            status: 'ongoing',
            gameWon: false,
          });
          data.gameId = games.id;
          await selectionsCollection.doc(payload.selection_id).set(data);
          await usersCollection.doc(this.userProfile.userId).update({
            rollover: true,
            gameId: games.id,
          });
        } catch (error) {
          this.$store.commit('SET_ALERT', {
            alert: true,
            type: 'error',
            message: error.message,
          });
        }
      }
    },

    async updateGame(outcome, gameId) {
      try {
        await gamesCollection.doc(gameId).update({
          status: outcome.status,
          gameWon: outcome.gameWon,
        });
      } catch (error) {
        this.$store.commit('SET_ALERT', {
          alert: true,
          type: 'error',
          message: error.message,
        });
      }
    },

    async updateSelection(id, outcome) {
      await selectionsCollection.doc(id).update({
        SelectionStatus: outcome,
      });
    },

    // Function to start game and add add game to board
    start() {
      // eslint-disable-next-line prefer-destructuring
      this.getNumberOfDays = this.selectedDays.split(' ')[0];
      this.started = true;
      this.nextAmount = Number(this.amount[this.amount.indexOf(Number(this.selectedStake))]);
      this.addGame();
      this.countGameAdded();
      const alert = {
        type: 'success',
        message: 'Cool, your new rollover game have started goodluck',
      };
      this.alert(alert);
    },
    confirm(index) {
      this.nextOnTable = index;
      this.nextAmount = Number(this.amount[this.amount.indexOf(this.nextAmount) + 1]);
      const type = 'Confirm';
      const message = 'Did this Ticket play?';
      this.openDialog(type, message);
    },

    // // Dialog action on emit of "yes"
    async yes() {
      if (this.actionDialog.type === 'Confirm') {
        this.changeGameStatus();
        if (!this.checkGameWon) {
          this.closeDialog();
          const alert = {
            type: 'success',
            message: 'Cool!!, Go ahead you are doin well',
          };
          this.alert(alert);
        } else {
          this.closeDialog();
          const type = 'Congratulations';
          const message = `you have made ${this.winingMoney}`;
          this.openDialog(type, message);
          const outcome = {
            gameWon: true,
            status: 'completed',
          };
          const gameId = await this.getGameId();
          this.updateGame(outcome, gameId);
        }
      }

      if (this.actionDialog.type === 'Start') {
        this.closeDialog();
        this.start();
      }

      if (this.actionDialog.type === 'Cancel Game') {
        this.closeDialog();
        this.reset();
        const alert = {
          type: 'success',
          message: 'Game Cancelled!!!',
        };
        this.alert(alert);
        const outcome = {
          gameWon: false,
          status: 'completed',
        };
        const gameId = await this.getGameId();
        this.updateGame(outcome, gameId);
        this.closeGame();
      }

      if (this.actionDialog.type === 'New Game') {
        this.closeDialog();
        this.reset();
        this.closeGame();
      }
    },

    // Dialog action on emit of "no"
    async no() {
      if (this.actionDialog.type === 'Confirm') {
        this.closeDialog();
        const message = 'Oops Sorry you lost, please try again';
        this.openDialog('Game Lost', message);
        const outcome = {
          gameWon: false,
          status: 'lost',
        };
        const id = this.added[this.nextOnTable].selection_id;
        const gameId = await this.getGameId();
        this.updateSelection(id, 'lost');
        this.updateGame(outcome, gameId);
        this.reset();
        this.closeGame();
      }

      if (this.actionDialog.type === 'Start'
       || this.actionDialog.type === 'Reset'
       || this.actionDialog.type === 'New Game') {
        this.closeDialog();
      }
    },

    openDialog(type, message) {
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type,
        message,
      });
    },

    closeDialog() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
      this.nextOnTable = 0;
    },

    // Function to change game status to won
    async changeGameStatus() {
      if (this.added.length < Number(this.getNumberOfDays)) {
        this.added[this.nextOnTable].gameStatus = 'won';
        const won = { ...this.added[this.nextOnTable] };
        this.added.splice(this.nextOnTable, 1, won);
        this.addGame();
        const id = this.added[this.nextOnTable].selection_id;
        this.updateSelection(id, 'won');
      } else {
        this.added[this.nextOnTable].gameStatus = 'won';
        const won = { ...this.added[this.nextOnTable] };
        this.added.splice(this.nextOnTable, 1, won);
        const id = this.added[this.nextOnTable].selection_id;
        this.updateSelection(id, 'won');
        this.gameWon = true;
      }
    },

    checkNextOntable() {
      if (this.nextOnTable <= this.added.length - 1) return true;
      return false;
    },

    // remove fixture from rollover
    removeItem(index) {
      this.added.splice(index, 1);
      this.countGameAdded();
    },

    // Method to get progress percentage
    countGameAdded() {
      this.numberAdded = this.added.length;
      this.valueDeterminate = Math.floor((this.added.length / Number(this.getNumberOfDays)) * 100);
    },

    // Reset all data in inputs
    reset() {
      this.added = [];
      this.valueDeterminate = 0;
      this.selectedStake = '';
      this.selectedDays = '';
      this.selectedOdds = '';
      this.selectedGoal = '';
      this.numberAdded = 0;
      this.getNumberOfDays = '';
      this.save = [];
      this.savedTotal = 0;
      this.nextAmount = 0;
      this.goalAmount = 0;
      this.winingMoney = null;
      this.started = false;
      this.gameWon = false;
      this.amount = [];
    },

    async closeGame() {
      await usersCollection.doc(this.userProfile.userId).update({
        rollover: false,
        gameId: '',
      });
    },
  },

  // Load data on component creation
  async created() {
    this.loadGameData();
  },

};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.flip-enter-active {
  animation: flip-in 1s ease-out forwards

}
.flip-leave-active {
  animation: flip-out 1s ease-out forwards;
}

@keyframes flip-in {
   from{
    transform: rotateY(90deg)
  }
  to {
    transform: rotateY(0deg)
  }
}

@keyframes flip-out {
  from{
    transform: rotateY(0deg)
  }
  to {
    transform: rotateY(90deg)
  }
}
</style>
