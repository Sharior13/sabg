const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io();

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;