<template>
  <v-dialog
    v-model="internalShown"
    @keydown.escape="dismissed"
    persistent
    width="600"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ title }}
        </span>
      </v-card-title>

      <v-card-text>
        {{ prompt }}
        <v-row dense class="pt-5">
          <v-col cols="12" class="pt-5">
            <v-select
              :label="$t('dialog.workingAreaReset.workbeeModel')"
              class="ma-0 pa-0"
              :items="workbeeModels"
              v-model="model"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dismissed">{{
          $t("generic.no")
        }}</v-btn>
        <v-btn color="blue darken-1" text @click="confirmed">{{
          $t("generic.yes")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
"use strict";

import { mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    shown: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    internalShown: {
      get() {
        return this.shown;
      },
      set(value) {
        if (value) {
          this.confirmed();
        } else {
          this.dismissed();
        }
      },
    },

    model: {
      get() {
        return this.workbeeModel;
      },
      set(value) {
        this.workbeeModel = value;
      },
    },

    workbeeModels() {
      return [
        {
          text: "WorkBee Z1+ 500x500mm - Working Area: 270x270x88mm",
          maxes: [270, 270, 88],
          value: 0,
        },
        {
          text: "WorkBee Z1+ 750x750mm - Working Area: 520x520x88mm",
          maxes: [520, 520, 88],
          value: 1,
        },
        {
          text: "WorkBee Z1+ 750x1000mm - Working Area: 520x770x88mm",
          maxes: [520, 770, 88],
          value: 2,
        },
        {
          text: "WorkBee Z1+ 1000x1000mm - Working Area: 770x770x88mm",
          maxes: [770, 770, 88],
          value: 3,
        },
        {
          text: "WorkBee Z1+ 1000x1500mm - Working Area: 770x1270x88mm",
          maxes: [770, 1270, 88],
          value: 4,
        },
        {
          text: "WorkBee Z1+ 1500x1500mm - Working Area: 1270x1270x88mm",
          maxes: [1270, 1270, 88],
          value: 5,
        },
		{
          text: "WorkBee Z1 500x500mm - Working Area: 300x270x94mm",
          maxes: [300, 270, 94],
          value: 6,
        },
        {
          text: "WorkBee Z1 750x750mm - Working Area: 550x520x94mm",
          maxes: [550, 520, 94],
          value: 7,
        },
        {
          text: "WorkBee Z1 750x1000mm - Working Area: 550x770x94mm",
          maxes: [550, 770, 94],
          value: 8,
        },
        {
          text: "WorkBee Z1 1000x1000mm - Working Area: 800x770x94mm",
          maxes: [800, 770, 94],
          value: 9,
        },
        {
          text: "WorkBee Z1 1000x1500mm - Working Area: 800x1270x94mm",
          maxes: [800, 1270, 94],
          value: 10,
        },
        {
          text: "WorkBee Z1 1500x1500mm - Working Area: 1300x1270x94mm",
          maxes: [1300, 1270, 94],
          value: 11,
        },
      ];
    },
  },
  data() {
    return {
      workbeeModel: 0,
    };
  },
  methods: {
    ...mapActions("machine", ["sendCode"]),
    ...mapActions("machine", ["upload"]),
    confirmed() {
      this.configureModelLimits();
      this.$emit("confirmed");
      this.$emit("update:shown", false);
    },
    dismissed() {
      this.$emit("dismissed");
      this.$emit("update:shown", false);
    },
    async configureModelLimits() {
      let code = `; Axes Limits configuration executed by config.g\n\nM208 X0 Y0 Z0 S1 ; Set axis minima\nM208`;
      let arrayLength = 3;
      let axes = ["X", "Y", "Z"];
      for (let i = 0; i < arrayLength; i++) {
        code += ` ${axes[i]}${
          this.workbeeModels[this.workbeeModel].maxes[i]
        }`;
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
