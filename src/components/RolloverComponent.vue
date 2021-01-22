<template>
  <div class="">
    <base-dialog @yes="won" @no="lost" />
    <base-back  v-if="userProfile" />
    <base-reset />
      <v-card
        style="width: 95vw;"
        class="mx-auto"
        color="transparent"
        outlined
        flat
      >
      <div class="text-center">
        <h3 class="primary--text text-center">Welcome to Rollover Games</h3>
        <small class="text-center primary--text">
          Select games you will play for each day below
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
                              :content="added.length === 0 || started ? '0': added.length "
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
                          <v-list v-if="added.length === 0 || started">
                            <v-list-item
                            >
                              <v-list-item-title>
                              No selected fixture yet
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                            <v-list v-else>
                            <v-list-item
                              v-for="(item, index) in added"
                              :key="index"
                            >
                              <v-list-item-title>
                                {{ `${item.homeTeam.team_name} - ${item.awayTeam.team_name}` }}
                                <v-btn
                                  text
                                  small
                                  @click="removeItem(index)">
                                  x
                                  </v-btn>
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
                  v-model="selectedDate"
                    :items="dateOptions"
                    label="Choose Date"
                    dense
                    @change="checkDate"
                    :disabled="checkLengthOfAdded"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="country"
                    :items="countries"
                    label="Select Country"
                    dense
                    @change="fillLeague"
                    :disabled="checkLengthOfAdded"
                  ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="league"
                  :disabled="!country"
                    :items="leagues"
                    label="Select league"
                    dense
                    @change="fillFixture"
                  ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="fixture"
                  :disabled="!league"
                    :items="selectedFixtures"
                    label="Select fixure"
                    dense
                    @change="matchDetails"
                  ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12">
                  <div style=" position: absolute; bottom: 1rem;">
                      <v-btn
                      :disabled="checkFields"
                        small
                        class="mr-2"
                        color="primary"
                        @click="add"
                      >Add
                      </v-btn>
                      <v-btn
                        :disabled="!checkLengthOfAdded && added.length < 11 || started"
                        small
                        class="mr-2"
                        color="primary"
                        @click="save"
                        >Save
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="mr-2"
                        small
                        @click="reset"
                        >
                        Reset
                      </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
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
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Day</th>
                      <th class="text-left">Fixture</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Stake</th>
                      <th class="text-left">Save</th>
                      <th class="text-left">Action</th>
                      <th class="text-left">Game</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in added"
                     :key="index"
                     >
                      <td>{{ item.fixture_id }}</td>
                      <td>{{ index + 1 }}</td>
                      <td>{{ `${item.homeTeam.team_name} - ${item.awayTeam.team_name}` }}</td>
                      <td>{{ item.status }}</td>
                      <td>{{ index === 0
                         || item.gameStatus === 'current'
                         || item.gameStatus === 'won'
                          ? amount[index] : 'Not set' }}
                      </td>
                      <td>{{ item.gameStatus === 'current'
                        && index > 0 || item.gameStatus === 'won'
                         ? (Number(amount[index]) * 2) - Number(amount[index + 1]) : '0' }}</td>
                      <td><v-btn
                          :disabled="item.gameStatus === 'waiting'
                          || item.gameStatus === 'won'
                          || !started"
                          @click="confirm(index)">
                          {{ item.gameStatus === 'won'
                            ? 'Confirmed' : 'Confirm'
                          }}
                        </v-btn>
                      </td>
                      <td :ref="'data-'+index">
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
import instance from '../services/payment-auth';

export default {
  data: () => ({
    todayFixtures: [],
    countries: [],
    leagues: [],
    selectedFixtures: [],
    fixtures: [],
    country: '',
    league: '',
    fixture: '',
    fixtureDetails: [],
    numberAdded: 0,
    added: [],
    valueDeterminate: 0,
    inputing: true,
    dateOptions: [],
    selectedDate: '',
    seven: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    indexForTable: [1],
    nextOnTable: 0,
    wonMatch: [],
    started: false,
    gameWon: false,
    amount: [
      '2000',
      '3000',
      '5000',
      '9000',
      '15000',
      '25000',
      '45000',
      '85000',
      '150000',
      '280000',
      '540000',
      '1080000',
    ],
  }),
  computed: {
    ...mapState(['userProfile']),
    checkFields() {
      return !this.country || !this.league || !this.fixture;
    },

    checkNumberAdded() {
      return this.numberAdded === 11;
    },

    // Validation for selected fixtures not more than eleven
    checkLengthOfAdded() {
      console.log(this.added.length);
      return this.added.length === 11;
    },
    checkGameWon() {
      return this.gameWon;
    },
  },

  // watch: {
  //   deep: true,
  //   // eslint-disable-next-line func-names
  //   added(newVal) {
  //     console.log(newVal);
  //   },
  // },

  methods: {

    confirm(index) {
      this.nextOnTable = index + 1;
      const type = 'Confirm';
      const message = 'Did this game play?';
      this.openDialog(type, message);
    },

    won() {
      this.changeGameStatus();
      if (!this.checkGameWon) {
        this.closeDialog();
      } else {
        this.closeDialog();
        const type = 'Congratulations';
        const message = `you have made ${Number(this.amount[this.amount.length - 2]) * 2}`;
        this.openDialog(type, message);
      }
    },

    lost() {
      this.reset();
      this.closeDialog();
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

    changeGameStatus() {
      this.added[this.nextOnTable - 1].gameStatus = 'won';
      const won = { ...this.added[this.nextOnTable - 1] };
      this.added.splice(this.nextOnTable - 1, 1, won);
      if (this.nextOnTable === this.added.length) {
        const lastIndex = this.added.length - 1;
        this.added[lastIndex].gameStatus = 'won';
        const nextMatch = { ...this.added[lastIndex] };
        this.added.splice(lastIndex, 1, nextMatch);
        this.gameWon = true;
      } else if (this.nextOnTable === this.added.length - 1) {
        console.log('check passed');
        const lastIndex = this.added.length - 1;
        this.added[lastIndex].gameStatus = 'current';
        const nextMatch = { ...this.added[lastIndex] };
        this.added.splice(lastIndex, 1, nextMatch);
      } else if (this.nextOnTable < this.added.length - 1) {
        console.log('check failed');
        this.added[this.nextOnTable].gameStatus = 'current';
        const nextMatch = { ...this.added[this.nextOnTable] };
        this.added.splice(this.nextOnTable, 1, nextMatch);
        this.wonMatch.push(this.nextOnTable - 1);
      }
    },

    checkNextOntable() {
      if (this.nextOnTable <= this.added.length - 1) return true;
      return false;
    },

    // On change of date make http request for new date
    checkDate() {
      this.loadData();
    },

    // load data for "select League"
    fillLeague() {
      const leagues = this.todayFixtures.filter((today) => today.league.country === this.country);
      this.leagues = leagues.map((league) => league.league.name);
    },

    // load data for "Select Fixture"
    fillFixture() {
      const fixtures = this.todayFixtures.filter((today) => today.league.name === this.league);
      this.selectedFixtures = fixtures.map((fixture) => `${fixture.homeTeam.team_name} - ${fixture.awayTeam.team_name}`);
    },

    // store user selected fixture
    matchDetails() {
      const homeTeam = this.fixture.split(' - ')[0].trim();
      const awayTeam = this.fixture.split(' - ')[1].trim();
      this.fixtureDetails = this.todayFixtures
        .filter((today) => today.homeTeam.team_name === homeTeam
         && today.awayTeam.team_name === awayTeam);
    },

    // http request to backend method
    async loadData() {
      try {
        this.$store.commit('OVERLAY_ON', 'connecting');
        const dateSelected = this.selectedDate.split(' ')[0];
        const url = `/fixtures?date=${dateSelected}`;
        // const token = await fb.auth.currentUser.getIdToken();
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        instance.get(url)
          .then((res) => {
            this.todayFixtures = res.data.data;
            this.countries = this.todayFixtures.map((today) => today.league.country);
            this.countries.sort();
            this.$store.commit('OVERLAY_OFF');
            // eslint-disable-next-line no-unused-vars
          }).catch((error) => {
            console.log(error);
            this.$store.commit('OVERLAY_OFF');
          });
      } catch (error) {
        console.log(error);
        this.$store.commit('OVERLAY_OFF');
      }
    },

    // Add add fixture to rollover
    add() {
      if (this.added.length >= 1) {
        if (this.checkIfExists()) {
          const type = 'Duplicate';
          const message = 'You have entered a duplicate fixture';
          this.openDialog(type, message);
          this.country = '';
          this.league = '';
          this.fixture = '';
          this.fixtureDetails = [];
          return;
        }

        if (this.added.length > 11) return;
      }
      this.addGame();
      this.countNumberAdded();
      this.country = '';
      this.league = '';
      this.fixture = '';
      this.fixtureDetails = [];
      this.numberAdded = 0;
    },

    addGame() {
      this.added.push(this.fixtureDetails[0]);
      const index = this.added.indexOf(this.fixtureDetails[0]);
      if (index === 0) {
        this.added[index].gameStatus = 'current';
      } else {
        this.added[index].gameStatus = 'waiting';
      }
    },

    save() {
      this.started = true;
    },

    // remove fixture from rollover
    removeItem(index) {
      this.added.splice(index, 1);
      this.countNumberAdded();
    },

    // Check for duplicates when adding fixtures to rollover
    checkIfExists() {
      console.log(this.fixtureDetails);
      const fixtureId = this.fixtureDetails[0].fixture_id;
      const duplicate = this.added.filter((f) => f.fixture_id === fixtureId);
      console.log(duplicate);
      return duplicate.length > 0;
    },

    // Method to add days incrementally
    addDays(date, numOfDays) {
      return `${date.getDate() + numOfDays} ${this.addDaysName(date, numOfDays)}`;
    },

    // Method to add dayName incrementally
    addDaysName(date, numOfDays) {
      if (date.getDay() + numOfDays >= this.seven.length) {
        const number = (date.getDay() + numOfDays) - this.seven.length;
        return this.seven[number];
      }

      return this.seven[date.getDay() + numOfDays];
    },

    // Method to load date data
    sevenDays() {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${this.seven[now.getDay()]}`;
      let count = 0;
      // eslint-disable-next-line no-unused-vars
      this.seven.forEach((s) => {
        if (`${now.getFullYear()}-${now.getMonth() + 1}-${this.addDays(now, count)}` === today) {
          this.dateOptions.push('Today');
        } else {
          this.dateOptions.push(`${now.getFullYear()}-${now.getMonth() + 1}-${this.addDays(now, count)}`);
        }
        count += 1;
      });
      // eslint-disable-next-line comma-spacing
      const [startDate,,,,,,,] = this.dateOptions;
      this.selectedDate = startDate;
    },

    // Method to get progress percentage
    countNumberAdded() {
      this.valueDeterminate = Math.floor((this.added.length / 11) * 100);
    },

    // Reset all data in inputs
    reset() {
      this.added = [];
      this.valueDeterminate = 0;
      this.country = '';
      this.league = '';
      this.fixture = '';
      this.fixtureDetails = [];
      this.numberAdded = 0;
    },
  },

  // Load data on component creation
  async created() {
    this.sevenDays();
    this.loadData();
  },

};
</script>
<style scoped>
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
