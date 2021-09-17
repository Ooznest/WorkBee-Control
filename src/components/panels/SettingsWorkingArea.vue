<template>
  <v-card outlined>
    <v-card-title>
      <span>{{ $t("panel.settingsWorkingArea.caption") }}</span>
      <v-spacer></v-spacer>
      <v-icon small class="mr-1">mdi-backup-restore</v-icon>
      <a
        v-show="!uiFrozen"
        href="#"
        @click.prevent="showResetConfirmation = true"
      >
        {{ $t("panel.settingsWorkingArea.resetWorkingArea") }}
      </a>
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
    <reset-working-area-dialog
      :shown.sync="showResetConfirmation"
      :title="$t('dialog.workingAreaReset.title')"
      :prompt="$t('dialog.workingAreaReset.prompt')"
    ></reset-working-area-dialog>
  </v-card>
</template>


<script>
"use strict";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("machine/model", {
      move: (state) => state.move,
    }),
    ...mapGetters(["uiFrozen"]),

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
    return {
      showResetConfirmation: false,
    };
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
        await this.upload({
          filename: "sys/config-axes-limits.g",
          content,
          showProgress: false,
          showSuccess: false,
        });
        await this.sendCode(`M98 P"config-axes-limits.g"`);
      } catch (e) {
        // TODO Optionally ask user to save file somewhere else
      }
    },
  },
};
</script>