<template>
  <v-card outlined>
    <v-card-title class="pb-0">
      {{ $t("panel.settingsWorkingArea.caption") }}
    </v-card-title>
    <v-card-text>
      <v-row align-content="center" no-gutters>
        <v-col
          v-for="(axis, index) in visibleAxes"
          :key="index"
          class="d-flex flex-column align-center mr-5"
          cols="3"
        >
          <v-text-field
            v-model.number="setAxesMaxes[index]"
            :label="$t('panel.settingsWorkingArea.axisLabel', [axis.letter])"
            type="number"
            step="1"
            min="1"
            hide-details
            @change="configureLimits"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
"use strict";

import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("machine/model", {
      move: (state) => state.move,
    }),

    visibleAxes() {
      return this.move.axes.filter((axis) => axis.visible);
    },

    setAxesMaxes() {
      let arrayLength = this.visibleAxes.length;
      let axesMaxes = [];
      for (let i = 0; i < arrayLength; i++) {
        axesMaxes.push(this.visibleAxes[i].max);
      }
      return axesMaxes;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("machine", ["sendCode"]),
    ...mapActions("machine", ["upload"]),

    async configureLimits() {
      let code = `; Axes Limits configuration executed by config.g\n\nM208 X0 Y0 Z0 S1 ; Set axis minima\nM208`;
      let arrayLength = this.visibleAxes.length;
      for (let i = 0; i < arrayLength; i++) {
        code += ` ${this.visibleAxes[i].letter}${this.setAxesMaxes[i]}`;
      }
      code += ` ; Set axis maxima`;

      const content = new Blob([code]);

      try {
        await this.upload({ filename: "sys/config-axes-limits.g", content, showProgress: false, showSuccess: false  });
        await this.sendCode(`M98 P"config-axes-limits.g"`);
      } catch (e) {
        // TODO Optionally ask user to save file somewhere else
      }
    },
  },
};
</script>