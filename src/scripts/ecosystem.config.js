module.exports = {
    apps : [
        {
            name      : 'Custering',
            script    : 'Clustering/src/app.babel-register.js',
            exec_mode : 'cluster_mode',
            instances : 'max'
        },
        {
            name      : 'Clustering_Replcia',
            script    : 'ClusteringReplica/src/app.babel-register.js',
            exec_mode : 'cluster_mode',
            instances : '2'
        }
    ],
    deploy : {
        production : {
            user : 'node',
            host : '202.5.1.1',
            ref  : 'origin/master',
            repo : 'git@github.com:DanishSiddiq/Clustering.git',
            path : '/var/www/production',
            'pre-deploy-local' : 'echo \'This is a local executed command\'',
            // Commands to be executed on the server after the repo has been cloned
            'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.json --env production',
        },
        staging : {
            'user' : 'node',
            'host' : '212.83.163.1',
            'ref'  : 'origin/master',
            'repo' : 'git@github.com:repo.git',
            'path' : '/var/www/development',
            'ssh_options': ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
            'post-deploy' : 'pm2 startOrRestart ecosystem.json --env dev',
            'env'  : {
                'NODE_ENV': 'staging'
            }
        }
    }
}