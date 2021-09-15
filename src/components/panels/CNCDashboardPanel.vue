<template>
    <div>
        <v-row dense>
            <v-col cols="12" class="pt-0 pb-0 mt3">
                <cnc-movement-panel class="mb-5"></cnc-movement-panel>
            </v-col>

            <v-col v-if="settings.touchProbe.touchProbeEnable" cols="12" class="pt-0 pb-0 mt3">
                <touch-probe-panel class="mb-5"></touch-probe-panel>
            </v-col>

            <v-col cols="12" class="pt-0 pb-0 mt3">
                <v-divider v-show="!hideGlobalContainer || $vuetify.breakpoint.mdAndUp" class="mb-5"></v-divider>
            </v-col>
            
            <v-col cols="12" class="pt-0 pb-1 mt3">
                <v-card>
                    <v-card-text>
                        <job-progress></job-progress>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="9">
                <v-row dense>
                    <v-col cols="12" sm="6" md="4" class="flex-grow-1">
                        <job-control-panel class="fill-height"></job-control-panel>
                    </v-col>
                   <v-col cols="12" sm="6" md="4" class="flex-grow-1">
                        <z-babystep-panel class="fill-height"></z-babystep-panel>
                    </v-col>
                    <v-col cols="12" md="4" class="flex-grow-1">
                        <speed-factor-panel class="fill-height"></speed-factor-panel>
                    </v-col>
                    <v-col cols="12">
                        <spindle-speed-panel></spindle-speed-panel>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="3">
                <v-row dense>
                    <v-col cols="12">
                        <macro-list></macro-list>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
"use strict";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("machine", ["settings"]),
  }
};</script>
