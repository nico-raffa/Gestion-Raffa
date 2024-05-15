const toggleCampo = (campoId) => {
    const campo = document.getElementById(campoId);
    if (campo) {
        campo.readOnly = !campo.readOnly; // Cambiar el estado de readOnly (true/false)
    }
};