const modules = import.meta.globEager('./**/*.(js|ts)')
Object.keys(modules).forEach((it) => {
  modules[it]
})
