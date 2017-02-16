window.onload = function() {
    if(screen&&screen<768) {
        var hammer = new Hammer(window);
        
        
hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

        hammer.on("swipedown",function() {
           
        })
    }
}