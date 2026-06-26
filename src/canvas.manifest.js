export const manifest = {
  screens: {
    scr_c6tfug: { name: "Home", route: "/", position: { "x": 160, "y": 1820 } },
    scr_108wbx: { name: "About", route: "/#about", position: { "x": 1560, "y": 1820 } },
    scr_wpd3wq: { name: "Services", route: "/#services", position: { "x": 2960, "y": 1820 } },
    scr_zjllil: { name: "Gallery", route: "/#gallery", position: { "x": 4360, "y": 1820 } },
    scr_9o0b8w: { name: "Appointments", route: "/#appointments", position: { "x": 5760, "y": 1820 } },
    scr_73axgc: { name: "Contact", route: "/#contact", position: { "x": 7160, "y": 1820 } },
    scr_teq06o: { name: "Admin Dashboard", route: "/admin", position: { "x": 0, "y": 0 }, isDefaultRow: true }
  },
  sections: {
    sec_fyigak: { name: "Main website", x: 0, y: 1600, width: 8520, height: 1180 }
  },
  layers: [
  { kind: "screen", id: "scr_teq06o" },
  { kind: "section", id: "sec_fyigak", children: [
    { kind: "screen", id: "scr_c6tfug" },
    { kind: "screen", id: "scr_108wbx" },
    { kind: "screen", id: "scr_wpd3wq" },
    { kind: "screen", id: "scr_zjllil" },
    { kind: "screen", id: "scr_9o0b8w" },
    { kind: "screen", id: "scr_73axgc" }]
  }]

};