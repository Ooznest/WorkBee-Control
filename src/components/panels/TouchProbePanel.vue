<template>
  <div>
    <v-card>
      <v-card-title class="pb-0 mb-0">
        <v-layout row justify-space-between>
          <v-flex lg8 md8 sm7 xs7>
            <v-icon small class="mr-1">gps_fixed</v-icon>
            {{ $t('panel.touchProbePanel.caption') }}
          </v-flex>
          <v-flex lg4 md4 sm5 xs5>
            <v-select
              :disabled="state.isPrinting || uiFrozen || !XYZProbe"
              persistent-hint
              :hint="$t('panel.touchProbePanel.probeLocation')"
              single-line
              class="ma-0 pa-0"
              v-model="locationSelect"
              :items="locationItems"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text class="pt-2 pb-2 mt-0">
        <v-layout row wrap justify-space-between>
          <v-flex
            xs12
            sm12
            md3
            lg3
            xl3
            order-xl0
            order-lg0
            order-md0
            order-sm0
            order-xs0
            class="pt-2"
          >
            <v-text-field
              :disabled="uiFrozen || state.isPrinting || !XYZProbe"
              v-model.number="endmillDiameter"
              type="number"
              step="0.01"
              min="0.01"
              :label="$t('panel.touchProbePanel.endmillDiameter')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md9 lg9 xl9 :class="{'pl-5': $vuetify.breakpoint.mdAndUp}">
            <v-layout column>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6 xl6 justify-center>
                  
                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl6 justify-center hidden-sm-and-down>
                  <div
                    class="text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                  >
                    <v-icon small class="mr-1">mdi-axis-arrow</v-icon>
                    {{ $t('panel.touchProbePanel.probeAxisCaption') }}
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6 xl6 :class="{'pr-5': $vuetify.breakpoint.mdAndUp, 'pt-0': $vuetify.breakpoint.smAndDown, }">
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeCornerTitle')"
                    color="success"
                    block
                    @click.native="cornerProbeClick"
                  >
                    {{ $t('panel.touchProbePanel.probeCornerCaption') }}
                  </v-btn>
                </v-flex>
                 <v-flex xs12 sm12 md6 lg6 xl6 justify-center hidden-md-and-up class="pt-3">
                  <div
                    class="text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                  >
                    <v-icon small class="mr-1">mdi-axis-arrow</v-icon>
                    {{ $t('panel.touchProbePanel.probeAxisCaption') }}
                  </div>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeXTitle')"
                    color="success"
                    block
                    @click.native="xProbeClick"
                    
                  >
                    <v-icon class="mr-1">mdi-arrow-right</v-icon>
                    {{ $t('panel.touchProbePanel.probeXCaption') }}
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeYTitle')"
                    color="success"
                    block
                    @click.native="yProbeClick"
                  >
                    <v-icon class="mr-1">mdi-arrow-up</v-icon>
                    {{ $t('panel.touchProbePanel.probeYCaption') }}
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting"
                    :title="$t('panel.touchProbePanel.probeZTitle')"
                    color="success"
                    block
                    @click.native="zProbeClick"
                  >
                    <v-icon class="mr-1">mdi-arrow-down</v-icon>
                    {{ $t('panel.touchProbePanel.probeZCaption') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <confirm-dialog
      :shown.sync="showTouchProbeConfirm"
      :question="$t('dialog.confirmTouchProbe.title')"
      :prompt= dialogPrompt
      @confirmed="runProbeCode"
    ></confirm-dialog>
  </div>
</template>

<script>
"use strict";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("machine", ["settings"]),
    ...mapState("machine/model", ["job", "state"]),
    ...mapGetters(["uiFrozen"]),

    locationItems() {
      return [
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontLeft"),
          value: 'FL'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontRight"),
          value: 'FR'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackLeft"),
          value: 'BL'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackRight"),
          value: 'BR'
        }
      ];
    },
    locationSelect: {
      get() {
        return this.settings.touchProbe.touchProbeLocation;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeLocation: value } });
      }
    },
    endmillDiameter: {
      get() {
        return this.settings.touchProbe.touchProbeEndmillDiameter;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeEndmillDiameter: value } });
      }
    },
    XYZProbe() {
      if (this.settings.touchProbe.touchProbeType == 0){
        return true
      }else{
        return false
      }
    }

  },
  data() {
    return {
      showTouchProbeConfirm: false,
      dialogPrompt: '',
      probeSequence: null,
      xDirection: 1,
      yDirection: 1,
      xProbeDirection: 0,
      yProbeDirection: 0,
      probeCode: null,
      xOffset: 0,
      yOffset: 0,
      xDimension: 0,
      yDimension:0,
      endstopInputs: ['xstop','ystop','zstop','e0stop','e1stop']
    };
  },
  methods: {
    ...mapMutations("machine/settings", ["update"]),
    ...mapActions('machine', ["sendCode"]),
    ...mapActions('machine', ['upload']),
    xProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'x';
      this.probeCode = `M400\nG91\nM563 P999 S"XYZ-Probe"
      \nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection)} Y${(((this.yDimension/2)-this.yOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nT999\nM585 X10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.xProbeDirection}\nT-1\nM400\nG10 L20 X${((this.xOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*(-1)*this.xDirection}\nG1 X${-5*this.xDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nM400\nM500\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Y${(((this.yDimension/2)-this.yOffset)*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 X0 F${this.settings.touchProbe.touchProbeFeedrate}
      \nM563 P999 D-1 H-1\nM291 P"${this.$t("dialog.touchProbeSuccess.prompt")}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`
      this.dialogPrompt = this.$t('dialog.confirmTouchProbe.prompt');
      this.showTouchProbeConfirm = true;
    },
    yProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'y';
      this.probeCode = `M400\nG91\nM563 P999 S"XYZ-Probe"
      \nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection)} Y${(((this.yDimension/2)-this.yOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Y${(((this.yDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nT999\nM585 Y10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.yProbeDirection}\nT-1\nM400\nG10 L20 Y${((this.yOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*(-1)*this.yDirection}\nG1 Y${-5*this.yDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nM400\nM500\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 Y0 F${this.settings.touchProbe.touchProbeFeedrate}
      \nM563 P999 D-1 H-1\nM291 P"${this.$t("dialog.touchProbeSuccess.prompt")}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`
      this.dialogPrompt = this.$t('dialog.confirmTouchProbe.prompt');
      this.showTouchProbeConfirm = true;
    },
    zProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'z';
      this.probeCode = `M400\nG91\nM563 P999 S"XYZ-Probe"
      \nT999\nM585 Z${(this.settings.touchProbe.touchProbeZDimension-this.settings.touchProbe.touchProbeZOffset)+10} E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S1\nT-1\nG10 L20 Z${this.settings.touchProbe.touchProbeZOffset}\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90
      \nM563 P999 D-1 H-1\nM291 P"${this.$t("dialog.touchProbeSuccess.prompt")}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`
      this.dialogPrompt = this.$t('dialog.confirmTouchProbe.promptZ');
      this.showTouchProbeConfirm = true;
    },
    cornerProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'corner';
      this.probeCode = `M400\nG91\nM558 K3 P5 C"${((this.settings.touchProbe.touchProbeTriggerType)?'!':'')}${this.endstopInputs[this.settings.touchProbe.touchProbeEndstopDriveNumber]}"
      \nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection)} Y${(((this.yDimension/2)-this.yOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nM585 Z10 K3 F${this.settings.touchProbe.touchProbeFeedrate} S1\nM400\nG10 L20 Z${this.settings.touchProbe.touchProbeZOffset}\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}
      \nG1 X${(((this.xDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nM585 X10 K3 F${this.settings.touchProbe.touchProbeFeedrate} S${this.xProbeDirection}\nM400\nG10 L20 X${((this.xOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*(-1)*this.xDirection}\nG1 X${-5*this.xDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(5+(this.xDimension/2))*this.xDirection} Y${(((this.yDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}
      \nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}
      \nM585 Y10 K3 F${this.settings.touchProbe.touchProbeFeedrate} S${this.yProbeDirection}\nM400\nG10 L20 Y${((this.yOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.yDirection}\nG1 Y${-5*this.yDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nM400\nM500\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.xDimension/2)-this.xOffset)*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 X0 Y0 F${this.settings.touchProbe.touchProbeFeedrate}
      \nM558 K3 P5 C"nil"\nM291 P"${this.$t("dialog.touchProbeSuccess.prompt")}" R"${this.$t("dialog.touchProbeSuccess.title")}" S1`;
      this.dialogPrompt = this.$t('dialog.confirmTouchProbe.prompt');
      this.showTouchProbeConfirm = true;
    },
    async runProbeCode() {
      const content = this.probeCode;
			try {
				await this.upload({ filename: 'sys/probe.g', content });
        this.$emit('editComplete', 'probe.g');
        await this.sendCode(`M98 P"probe.g"`)
			} catch (e) {
				// TODO Optionally ask user to save file somewhere else
			}
    },
    setCornerDirection() {
      if (this.settings.touchProbe.touchProbeLocation == 'FR' || this.settings.touchProbe.touchProbeLocation == 'BR'){
        this.xDirection = -1;
        this.xProbeDirection = 1;
      }else{
        this.xDirection = 1;
        this.xProbeDirection = 0;
      }
      if (this.settings.touchProbe.touchProbeLocation == 'BL' || this.settings.touchProbe.touchProbeLocation == 'BR'){
        this.yDirection = -1;
        this.yProbeDirection = 1;
      }else{
        this.yDirection = 1;
        this.yProbeDirection = 0;
      }
      if (this.settings.touchProbe.touchProbeLocation == 'FL' || this.settings.touchProbe.touchProbeLocation == 'BR'){
        this.xOffset = this.settings.touchProbe.touchProbeXOffset;
        this.yOffset = this.settings.touchProbe.touchProbeYOffset;
        this.xDimension = this.settings.touchProbe.touchProbeXDimension;
        this.yDimension = this.settings.touchProbe.touchProbeYDimension;
      }else{
        this.xOffset = this.settings.touchProbe.touchProbeYOffset;
        this.yOffset = this.settings.touchProbe.touchProbeXOffset;
        this.xDimension = this.settings.touchProbe.touchProbeYDimension;
        this.yDimension = this.settings.touchProbe.touchProbeXDimension;
      }
    },
  }
};
</script>
