export const query = `
{
    user (order_by: { login: asc }) {
        login
        attrs
        campus
        auditRatio
        totalUp
        totalDown

        xps {
            amount
            path
        }
    }

    transaction {
        type
        amount
        attrs
        createdAt
        path
      
      	object {
            type
        }
    }

    result {
        createdAt
        grade
        attrs
        type
        path
        version
        isLast
        campus

      	object {
          name
          type
        }
    }

    audit {
        createdAt
        endAt

        group {
            captainLogin
            status
            object {
                name
            }
        }
        
        auditor {
            login
        }
        
        private {
            code
        }
    }

    event_user {
        level
        userAuditRatio
        userLogin
        userId
        createdAt

        event {
            path
        }
    }

    event {
        campus
        createdAt
        description
        startAt
        endAt
        path

        object {
            name
        }
    }
}`

export const rank = [
    'Aspiring developer',
    'Beginner developer',
    'Apprentice developer',
    'Assistant developer',
    'Basic developer',
    'Junior developer',
    'Confirmed developer',
    'Full-Stack developer'
]

export const auditComments = {
    "1.5": ['Almost perfect!', '#03c697'],
    "1.4": ['', ''],
    "1.3": ['', ''],
    "1.2": ['You can do better!', '#ddb941'],
    "1.1": ['You can do better!', '#ddb941'],
    "1.0": ['You can do better!', '#ddb941'],
    "0.9": ['Make more audits!', '#ffa482'],
    "0.8": ['', ''],
    "0.7": ['Careful buddy!', '#d7717f'],
    "0.6": ['Careful buddy!', '#d7717f'],
    "0.5": ['Careful buddy!', '#d7717f'],
    "0.4": ['', ''],
    "0.3": ['', '']
}

export const day = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
]

export const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]
