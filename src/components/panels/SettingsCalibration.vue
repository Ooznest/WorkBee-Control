<template>
  <v-card outlined>
    <v-card-title>
      <span>{{ $t("panel.settingsCalibration.caption") }}</span>
      <v-spacer></v-spacer>
      <v-icon small class="mr-1">mdi-backup-restore</v-icon>
      <a
        v-show="!uiFrozen"
        href="#"
        @click.prevent="showResetConfirmation = true"
      >
        {{ $t("panel.settingsCalibration.resetCalibration") }}
      </a>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col
          v-for="(axis, index) in visibleAxes"
          :key="index"
          class="d-flex flex-column mr-4"
          cols="5"
        >
          <v-text-field
            v-model.number="setStepsPerMM[index]"
            :label="
              $t('panel.settingsCalibration.axisLabel', [
                formatAxisLetter(axis.letter),
              ])
            "
            type="number"
            step="0.001"
            min="1"
            hide-details
            @change="configureStepsPerMM"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <confirm-dialog
      :shown.sync="showResetConfirmation"
      :title="$t('dialog.confirmTouchProbeReset.title')"
      :prompt="$t('dialog.confirmTouchProbeReset.prompt')"
      @confirmed="resetConfirmed()"
    ></confirm-dialog>
  </v-card>
</template>


<script>
"use strict";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["uiFrozen"]),
   ...mapState("machine/model", ["job", "state"]),
    ...mapState("machine/model", {
      move: (state) => state.move,
    }),
    ...mapGetters(["uiFrozen"]),

    visibleAxes() {
      return this.move.axes;
    },

    setStepsPerMM() {
      let arrayLength = this.visibleAxes.length;
      let setStepsPerMM = [];
      for (let i = 0; i < arrayLength; i++) {
        setStepsPerMM.push(this.visibleAxes[i].stepsPerMm);
      }
      return setStepsPerMM;
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

    async configureStepsPerMM() {
      let code = `; Axes Calibration configuration executed by config.g\n\nM92`;
      let arrayLength = this.visibleAxes.length;
      for (let i = 0; i < arrayLength; i++) {
        code += ` ${this.visibleAxes[i].letter}${this.setStepsPerMM[i]}`;
      }
      code += ` ; Set steps per mm`;

      const content = new Blob([code]);

      try {
        await this.upload({
          filename: "sys/config-axes-calibration.g",
          content,
          showProgress: false,
          showSuccess: false,
        });
        this.$emit("uploadComplete", "sys/config-axes-calibration.g");
        await this.sendCode(`M98 P"config-axes-calibration.g"`);
        this.$log("success", this.$t("notification.calibration.message"));
      } catch (e) {
        // TODO Optionally ask user to save file somewhere else
      }
    },

    formatAxisLetter(axisLetter) {
      if (axisLetter == "Y") {
        return "Y-(Left)";
      }
      if (axisLetter == "U") {
        return "Y-(Right)";
      }
      return axisLetter;
    },

    resetConfirmed() {
      for (let i = 0; i < 4; i++) {
        this.setStepsPerMM[i] = 400;
      }
      this.configureStepsPerMM();
    },
  },
};
</script>