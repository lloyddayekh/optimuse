<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  Shape,
  ExtrudeGeometry
} from 'three'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'dat.gui'

const props = withDefaults(
  defineProps<{
    geometry: number[][]
    editableHeight: number
  }>(),
  { editableHeight: 2 }
)

//ANCHOR - Variables
const threeScene = ref<HTMLCanvasElement | null>(null)

let renderer: WebGL1Renderer
let camera: PerspectiveCamera
let controls: OrbitControls

//ANCHOR - Create new Scene
const scene = new Scene()

//ANCHOR - Use vue use library to get window height and width
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)
const adjustableHeight = ref(props.editableHeight)

//ANCHOR - update the Renderer and Camera size and aspect ratio for responsive purposes

function updateRenderer() {
  renderer.setSize(width.value, height.value)
  renderer.setPixelRatio(window.devicePixelRatio)
}

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

//ANCHOR - Create new PerspectiveCamera

camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)

camera.position.z = 5
camera.aspect = aspectRatio.value
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

scene.add(camera)

//ANCHOR - Create new shape based on geometry

const shape = new Shape()

shape.moveTo(props.geometry[0][0], props.geometry[0][1])
for (let i = 1; i < props.geometry.length; i++) {
  shape.lineTo(props.geometry[i][0], props.geometry[i][1])
}

const extrudeSettings = computed(() => {
  return {
    steps: 2,
    depth: adjustableHeight.value,
    bevelEnabled: false
  }
})
const object3D = new Mesh(
  new ExtrudeGeometry(shape, extrudeSettings.value),
  new MeshBasicMaterial({ color: 0xdfc5fe, transparent: true, opacity: 0.8 })
)
const objectColor = { color: 0xdfc5fe }
scene.add(object3D)

//ANCHOR - Create new gui

const gui = new GUI()
const objectFolder = gui.addFolder('Cube')
objectFolder.add(object3D.rotation, 'x', 0, Math.PI * 2).name('Rotate x:')
objectFolder.add(object3D.rotation, 'y', 0, Math.PI * 2).name('Rotate y:')
objectFolder.add(object3D.rotation, 'z', 0, Math.PI * 2).name('Rotate y:')
objectFolder.add(object3D.scale, 'x', 0, 3).name('Scale x:')
objectFolder.add(object3D.scale, 'y').min(0).max(adjustableHeight.value).name('Scale y:')
objectFolder.add(object3D.scale, 'z', 0, 2).name('Scale z:')
objectFolder
  .addColor(objectColor, 'color')
  .name('Change color:')
  .onChange(() => object3D.material.color.set(objectColor.color))

function loop() {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(loop)
}

onMounted(() => {
  renderer = new WebGL1Renderer({
    canvas: threeScene.value as unknown as HTMLCanvasElement,
    antialias: true
  })
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.screenSpacePanning = false
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 30
  controls.maxDistance = 100

  updateRenderer()
  updateCamera()
  objectFolder.open()

  loop()
})
onUnmounted(() => {
  gui.removeFolder(objectFolder)
})

watch(aspectRatio, updateRenderer)
watch(aspectRatio, updateCamera)
</script>

<template>
  <!-- <div ref="threeScene" /> -->
  <canvas ref="threeScene" />
</template>
