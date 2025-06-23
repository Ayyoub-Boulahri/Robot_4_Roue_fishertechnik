export const commands  = [
    {
        label:"follow line X", 
        cmd:"line_follower.followX()"
    },
    {
        label:"follow line Y", 
        cmd:"line_follower.followY()"
    },
    {
        label:"follow wall", 
        cmd:"eyes.follow_wall()"
    },
    {
        label:"eviter obstacles", 
        cmd:"eyes.avoid_obstacles()"
    }
]

export const stopCommand = "robot.stop()"
export const getCommand = "get_data()"
