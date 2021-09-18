<style scoped>
.location-selection {
  max-width: 200px;
}

@media screen and (max-width: 440px) {
  .location-selection {
    max-width: 440px;
  }
}
</style>

<template>
	<v-card>
		<v-card-title class="pt-0">
        <v-row dense>
        <v-col cols="12" order="1" md="3" sm="6" class="pt-5">
        <v-icon small class="mr-1">mdi-crosshairs-gps</v-icon>
        {{ $t("panel.touchProbePanel.caption") }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" order="3" md="6" sm="12" order-md="2" class="pt-5 d-flex flex-column align-center">
        <div>{{ $t("panel.touchProbePanel.probeStatus") }}
        <span>{{ formatProbeValue(probes[0].value) }}</span></div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" order="2" md="3" sm="6" order-md="3" >
        <v-select
          :disabled="state.isPrinting || uiFrozen || !XYZProbe"
          persistent-hint
          :hint="$t('panel.touchProbePanel.probeLocation')"
          single-line
          v-model="locationSelect"
          :items="locationItems"
        ></v-select>
                </v-col>

        </v-row>
      </v-card-title>
      <v-card-text class="pt-4 pb-2 mt-0">
        <v-row dense>
          <v-col cols="12" md="2">
            <v-text-field
              :disabled="uiFrozen || state.isPrinting || !XYZProbe"
              v-model.number="endmillDiameter"
              type="number"
              step="0.01"
              min="0.01"
              :label="$t('panel.touchProbePanel.endmillDiameter')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" offset-md="1" class="pt-4">
            <v-btn
              :disabled="uiFrozen || state.isPrinting || !XYZProbe"
              :title="$t('panel.touchProbePanel.probeCornerTitle')"
              color="success"
              block
              @click.native="cornerProbeClick"
            >
              {{ $t("panel.touchProbePanel.probeCornerCaption") }}
            </v-btn>
          </v-col>
          <v-col cols="12" order="2" md="5" offset-md="1" class="pt-4">
            <v-row dense>
              <v-col cols="12" md="4" sm="4">
                <v-btn
                  :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                  :title="$t('panel.touchProbePanel.probeXTitle')"
                  color="success"
                  block
                  @click.native="xProbeClick"
                >
                  <v-icon class="mr-1">mdi-arrow-right</v-icon>
                  {{ $t("panel.touchProbePanel.probeXCaption") }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-btn
                  :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                  :title="$t('panel.touchProbePanel.probeYTitle')"
                  color="success"
                  block
                  @click.native="yProbeClick"
                >
                  <v-icon class="mr-1">mdi-arrow-up</v-icon>
                  {{ $t("panel.touchProbePanel.probeYCaption") }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-btn
                  :disabled="uiFrozen || state.isPrinting"
                  :title="$t('panel.touchProbePanel.probeZTitle')"
                  color="success"
                  block
                  @click.native="zProbeClick"
                >
                  <v-icon class="mr-1">mdi-arrow-down</v-icon>
                  {{ $t("panel.touchProbePanel.probeZCaption") }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="12" class="d-flex flex-column align-center">
                <div><v-icon small class="mr-1">mdi-axis-arrow</v-icon>
                    {{ $t("panel.touchProbePanel.probeAxisCaption") }}</div>
            </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <touch-probe-confirm-dialog
      :shown.sync="showTouchProbeConfirm"
      :title="$t('dialog.confirmTouchProbe.title')"
      :prompt="dialogPrompt"
      @confirmed="runProbeCode"
    ></touch-probe-confirm-dialog>
    </v-card>
</template>

<script>
"use strict";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {ProbeType} from '../../store/machine/modelEnums.js';


export default {
  computed: {
    ...mapState("machine", ["settings"]),
    ...mapState("machine/model", ["job", "state"]),
    ...mapGetters(["uiFrozen"]),
    ...mapState('machine/model', {
			sensors: (state) => state.sensors,
		}),

		probes() {
			return this.sensors.probes.filter((probe) => probe !== null && probe.type !== ProbeType.none);
		},

    locationItems() {
      return [
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontLeft"),
          value: "FL",
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontRight"),
          value: "FR",
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackLeft"),
          value: "BL",
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackRight"),
          value: "BR",
        },
      ];
    },
    locationSelect: {
      get() {
        return this.settings.touchProbe.touchProbeLocation;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeLocation: value } });
      },
    },
    endmillDiameter: {
      get() {
        return this.settings.touchProbe.touchProbeEndmillDiameter;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeEndmillDiameter: value } });
      },
    },
    XYZProbe() {
      if (this.settings.touchProbe.touchProbeType == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      showTouchProbeConfirm: false,
      dialogPrompt: "",
      probeSequence: null,
      xDirection: 1,
      yDirection: 1,
      xProbeDirection: 0,
      yProbeDirection: 0,
      probeCode: null,
      xOffset: 0,
      yOffset: 0,
      xDimension: 0,
      yDimension: 0,
      endstopInputs: ["xstop", "ystop", "zstop", "e0stop", "e1stop"],
    };
  },
  methods: {
    ...mapMutations("machine/settings", ["update"]),
    ...mapActions("machine", ["sendCode"]),
    ...mapActions("machine", ["upload"]),

    formatProbeValue(value) {
			if (value == 0) {
				return this.$t('panel.touchProbePanel.probeNotTriggered')
			}
			return this.$t('panel.touchProbePanel.probeTriggered')
		},

    xProbeClick() {
      this.setCornerDirection();
      this.probeSequence = "x";
      this.probeCode = `M400\nG91\nM563 P49 S"XYZ-Probe"\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${
        (this.xDimension / 2 - this.xOffset) * this.xDirection
      } Y${(this.yDimension / 2 - this.yOffset) * this.yDirection} F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nG1 X${
        (this.xDimension / 2 +
          5 +
          this.settings.touchProbe.touchProbeEndmillDiameter / 2) *
        this.xDirection *
        -1
      } F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${
        -5 - this.settings.touchProbe.touchProbeZDimension / 2
      } F${this.settings.touchProbe.touchProbeFeedrate}\nT49\nM585 X10 F${
        this.settings.touchProbe.touchProbeFeedrate
      } P0 S${this.xProbeDirection}\nT-1\nM400\nG10 L20 X${
        (this.xOffset +
          this.settings.touchProbe.touchProbeEndmillDiameter / 2) *
        -1 *
        this.xDirection
      }\nG1 X${-5 * this.xDirection} F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nG1 Z${
        5 + this.settings.touchProbe.touchProbeZDimension / 2
      } F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Y${
        (this.yDimension / 2 - this.yOffset) * this.yDirection * -1
      } F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90\nG1 X0 F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nM563 P49 D-1 H-1\nM291 P"${this.$t(
        "dialog.touchProbeSuccess.prompt"
      )}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`;
      this.dialogPrompt = this.$t("dialog.confirmTouchProbe.prompt");
      this.showTouchProbeConfirm = true;
    },
    yProbeClick() {
      this.setCornerDirection();
      this.probeSequence = "y";
      this.probeCode = `M400\nG91\nM563 P49 S"XYZ-Probe"\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${
        (this.xDimension / 2 - this.xOffset) * this.xDirection
      } Y${(this.yDimension / 2 - this.yOffset) * this.yDirection} F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nG1 Y${
        (this.yDimension / 2 +
          5 +
          this.settings.touchProbe.touchProbeEndmillDiameter / 2) *
        this.yDirection *
        -1
      } F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${
        -5 - this.settings.touchProbe.touchProbeZDimension / 2
      } F${this.settings.touchProbe.touchProbeFeedrate}\nT49\nM585 Y10 F${
        this.settings.touchProbe.touchProbeFeedrate
      } P0 S${this.yProbeDirection}\nT-1\nM400\nG10 L20 Y${
        (this.yOffset +
          this.settings.touchProbe.touchProbeEndmillDiameter / 2) *
        -1 *
        this.yDirection
      }\nG1 Y${-5 * this.yDirection} F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nG1 Z${
        5 + this.settings.touchProbe.touchProbeZDimension / 2
      } F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${
        (this.xDimension / 2 - this.xOffset) * this.xDirection * -1
      } F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90\nG1 Y0 F${
        this.settings.touchProbe.touchProbeFeedrate
      }\nM563 P49 D-1 H-1\nM291 P"${this.$t(
        "dialog.touchProbeSuccess.prompt"
      )}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`;
      this.dialogPrompt = this.$t("dialog.confirmTouchProbe.prompt");
      this.showTouchProbeConfirm = true;
    },
    zProbeClick() {
      this.setCornerDirection();
      this.probeSequence = "z";
      this.probeCode = `M400\nG91\nM563 P49 S"XYZ-Probe"\nT49\nM585 Z-${
        this.settings.touchProbe.touchProbeZDimension -
        this.settings.touchProbe.touchProbeZOffset +
        10
      } F${this.settings.touchProbe.touchProbeFeedrate} P0 S1\nT-1\nM400\nG10 L20 Z${
        this.settings.touchProbe.touchProbeZOffset
      }\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90\nM563 P49 D-1 H-1\nM291 P"${this.$t(
        "dialog.touchProbeSuccess.prompt"
      )}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`;
      this.dialogPrompt = this.$t("dialog.confirmTouchProbe.promptZ");
      this.showTouchProbeConfirm = true;
    },
    cornerProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'corner';
      this.probeCode = `M400\nG91\nM563 P49 S"XYZ-Probe"\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection)} Y${(((this.yDimension/2)-this.yOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nT49\nM585 Z10 F${this.settings.touchProbe.touchProbeFeedrate} P0 S1\nT-1\nM400\nG10 L20 Z${this.settings.touchProbe.touchProbeZOffset}
      \nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nT49\nM585 X10 F${this.settings.touchProbe.touchProbeFeedrate} P0 S${this.xProbeDirection}\nT-1\nM400\nG10 L20 X${((this.xOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*(-1)*this.xDirection}
      \nG1 X${-5*this.xDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(5+(this.xDimension/2))*this.xDirection} Y${(((this.yDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nT49\nM585 Y10 F${this.settings.touchProbe.touchProbeFeedrate} P0 S${this.yProbeDirection}\nT-1\nM400\nG10 L20 Y${((this.yOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.yDirection}
      \nG1 Y${-5*this.yDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90\nG1 X0 Y0 F${this.settings.touchProbe.touchProbeFeedrate}\nM563 P49 D-1 H-1\nM291 P"${this.$t("dialog.touchProbeSuccess.prompt")}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`;
      this.dialogPrompt = this.$t('dialog.confirmTouchProbe.prompt');
      this.showTouchProbeConfirm = true;
    },
    async runProbeCode() {
      const content = new Blob([this.probeCode]);
      try {
				await this.upload({ filename: 'sys/probe.g', content, showProgress: false, showSuccess: false, });
        await this.sendCode(`M98 P"probe.g"`)
			} catch (e) {
				// TODO Optionally ask user to save file somewhere else
			}
    },
    setCornerDirection() {
      if (
        this.settings.touchProbe.touchProbeLocation == "FR" ||
        this.settings.touchProbe.touchProbeLocation == "BR"
      ) {
        this.xDirection = -1;
        this.xProbeDirection = 1;
      } else {
        this.xDirection = 1;
        this.xProbeDirection = 0;
      }
      if (
        this.settings.touchProbe.touchProbeLocation == "BL" ||
        this.settings.touchProbe.touchProbeLocation == "BR"
      ) {
        this.yDirection = -1;
        this.yProbeDirection = 1;
      } else {
        this.yDirection = 1;
        this.yProbeDirection = 0;
      }
      if (
        this.settings.touchProbe.touchProbeLocation == "FL" ||
        this.settings.touchProbe.touchProbeLocation == "BR"
      ) {
        this.xOffset = this.settings.touchProbe.touchProbeXOffset;
        this.yOffset = this.settings.touchProbe.touchProbeYOffset;
        this.xDimension = this.settings.touchProbe.touchProbeXDimension;
        this.yDimension = this.settings.touchProbe.touchProbeYDimension;
      } else {
        this.xOffset = this.settings.touchProbe.touchProbeYOffset;
        this.yOffset = this.settings.touchProbe.touchProbeXOffset;
        this.xDimension = this.settings.touchProbe.touchProbeYDimension;
        this.yDimension = this.settings.touchProbe.touchProbeXDimension;
      }
    },
  },
};
</script>
